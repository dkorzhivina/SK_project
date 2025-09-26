#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QRandomGenerator>
#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow) {
    ui->setupUi(this);

    connect(ui->generateButton, &QPushButton::clicked, this, &MainWindow::generatePassword);
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::generatePassword() {
    bool ok;
    int length = ui->lengthInput->text().toInt(&ok);
    if (!ok || length <= 0) {
        QMessageBox::warning(this, "Ошибка", "Введите корректную длину пароля.");
        return;
    }

    QString chars = "abcdefghijklmnopqrstuvwxyz";
    if (ui->includeUppercase->isChecked()) {
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (ui->includeNumbers->isChecked()) {
        chars += "0123456789";
    }
    if (ui->includeSpecial->isChecked()) {
        chars += "!@#$%^&*()-_=+[]{}|;:,.<>?/";
    }

    if (chars.isEmpty()) {
        QMessageBox::warning(this, "Ошибка", "Выберите хотя бы один параметр для пароля.");
        return;
    }

    QString password;
    for (int i = 0; i < length; ++i) {
        int index = QRandomGenerator::global()->bounded(chars.length());
        password += chars.at(index);
    }

    ui->resultOutput->setText(password);
}
