## Статут жизни репозитория

[![GitHub release](https://img.shields.io/github/release/PavelGalanin2001/js-assignments.svg)](https://github.com/PavelGalanin2001/js-assignments/releases/latest)

master | PavelGalanin2001/master
--- | --- 
[![Build Status](https://travis-ci.org/PavelGalanin2001/js-assignments.svg?branch=PavelGalanin2001/master)](https://travis-ci.org/PavelGalanin2001/js-assignments)|[![Build Status](https://travis-ci.org/PavelGalanin2001/js-assignments.svg?branch=PavelGalanin2001/master)](https://travis-ci.org/PavelGalanin2001/js-assignments)

---

# О репозитории Java Script assignments

---

## О создателе

Репозиторий [IT Shark](https://github.com/it-shark-pro/js-assignments). Их сайт [тут](https://it-shark.pro/).

В данном репозитории  требуется решить нейкие функции.

---

## Похожие ресурсы

- https://github.com/rmurphey/js-assessment
- https://github.com/mrdavidlaing/javascript-koans
- https://github.com/vasanthk/js-bits

---

## Как начать

---

Желательная операционная система Linux Debian-подобные (Ubuntu, [Xubuntu](https://xubuntu.org/download), KDE Neon, ...), т. к. программы исполняются быстрее тут, а не как в Window эмуляторы Gem, Node JS, Git и другие программы, ведь в Linux дистрибутивах можно установить введя пару строк в терминале. В Windows 10 появилось ядро Linux - можно почитать о `WSL`, но я рекомендую  Xubuntu.

### I. Регистрация себя в социальной сети программистов

1. Создаем аккаунт [тут](https://github.com/)

---

### II. Делаем fork

Fork - вилка. Делам так, потому что, если автор изменит репозиторий, то мы могли иметь обновленую информации у себя.

1. Находим кнопку 'Fork' и кликаем по ней [на этой странице](https://github.com/it-shark-pro/js-assignments)

---

### III. Клонируем репозиторий 

#### Если нет программы Git
1. $ `sudo apt install git` // установка git

#### Метод HTTPS - нужно вводить имя и пароль при каждой отправке изменений на GitHub
1. $ `sudo apt update` // обновление пакетов
2. $ `sudo apt upgrade` // обновление системы
3. $ `git clone https://github.com/it-shark-pro/js-assignments.git`

#### Метод SSH - не нужно вводить имя и пароль при каждой отправке изменений на GitHub
1. $ `ssh-keygen` // генерация секретного ключа
2. $ `cat /home/${USER}/.ssh/id_rsa.pub` // вывести ключ в терминал

${USER} - переменная линукса, т. е. она сама подставит имя пользователя

3. Копируем из терминала зажатием клавиш 'Ctrl' + 'Shift' + 'C'
4. Добавляем ключ в свой аккаунт [тут](https://github.com/settings/keys)
5. $ `git clone git@github.com:it-shark-pro/js-assignments.git` // склонировать репозиторий

---

### IV. Скачиваем Node JS пакеты для работы программ в репозитории

Для исполнения пакетов Node JS нужен сам Node JS
1. $ `sudo apt update` // обновление пакетов
2. $ `sudo apt upgrade` // обновление системы
3. $ `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`// добавление в список скачивания пакета
4. $ `sudo apt-get install -y nodejs` // скачивание пакета-программы

---

## Как понять наше задание?

### 1. @param {string} value
Расшифровка:
- @param - дан параметр
- {string} - строка
- value - используется в функции как `value`

### 2. @return {number}
Расшифровка:
- @return - возратить
- {number} - число

### 3. @example
 *   'aaaaa' => 5
 *   'b'     => 1
 *   ''      => 0
 Расшифровка:
 - дана строка `'aaaaa'` возратить число `5`
 - дана строка `'b'` возратить число `1`
 - дана строка `''` возратить число `0`
 
---
 
## Сообщить о своем продвижении

Сообщать о своих результатах [в форме](https://goo.gl/forms/AhDP2YQQ7SziByeU2).

---

