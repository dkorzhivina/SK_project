<template>
  <div class="ui-select" ref="root" :class="{ 'is-open': open, 'is-filled': !!currentLabel }">
    <button
      type="button"
      class="ui-select__control"
      @click="toggle"
      @keydown.down.prevent="openList"
      @keydown.enter.prevent="toggle"
      :aria-expanded="open ? 'true' : 'false'"
    >
      <span class="ui-select__value" :class="{ 'is-placeholder': !currentLabel }">
        {{ currentLabel || placeholder }}
      </span>
      <span class="ui-select__arrow" aria-hidden>▾</span>
    </button>

    <transition name="fade-scale">
      <div v-if="open" class="ui-select__popover">
        <div v-if="searchable" class="ui-select__search">
          <input
            ref="searchInput"
            v-model="query"
            class="input"
            type="text"
            :placeholder="searchPlaceholder"
            @keydown.down.prevent="focusNext()"
            @keydown.up.prevent="focusPrev()"
          />
        </div>

        <ul class="ui-select__menu" role="listbox">
          <li v-if="filtered.length === 0" class="ui-option ui-option--empty">Ничего не найдено</li>
          <li
            v-for="(opt, i) in filtered"
            :key="opt.value"
            class="ui-option"
            :class="{ 'is-active': i === activeIndex, 'is-selected': opt.value === modelValue }"
            @mouseenter="activeIndex = i"
            @mousedown.prevent="select(opt.value)"
            role="option"
          >
            <span>{{ opt.label }}</span>
            <span v-if="opt.value === modelValue" class="ui-check">✓</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: [String, Number, null],
  options: { type: Array, required: true }, // [{value,label}]
  placeholder: { type: String, default: 'Выберите…' },
  searchable: { type: Boolean, default: false },
  searchPlaceholder: { type: String, default: 'Поиск…' }
})
const emit = defineEmits(['update:modelValue'])

const root = ref(null)
const open = ref(false)
const query = ref('')
const activeIndex = ref(-1)
const searchInput = ref(null)

const filtered = computed(() => {
  if (!props.searchable || !query.value.trim()) return props.options
  const q = query.value.toLowerCase()
  return props.options.filter(o => o.label.toLowerCase().includes(q))
})
const currentLabel = computed(() => {
  const hit = props.options.find(o => o.value === props.modelValue)
  return hit?.label ?? ''
})

function toggle() {
  open.value = !open.value
  if (open.value) {
    query.value = ''
    activeIndex.value = Math.max(0, filtered.value.findIndex(o => o.value === props.modelValue))
    nextTick(() => searchInput.value?.focus())
  }
}
function openList() { if (!open.value) toggle() }
function close() { open.value = false }
function select(val) { emit('update:modelValue', val); close() }

function onClickOutside(e) {
  if (root.value && !root.value.contains(e.target)) close()
}
onMounted(() => document.addEventListener('mousedown', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside))

function focusNext() {
  if (!filtered.value.length) return
  activeIndex.value = (activeIndex.value + 1) % filtered.value.length
}
function focusPrev() {
  if (!filtered.value.length) return
  activeIndex.value = (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
}

watch(open, v => {
  if (!v) { query.value = ''; activeIndex.value = -1 }
})
</script>
