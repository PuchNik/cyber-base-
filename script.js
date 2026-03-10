// Данные: команды Cisco и MikroTik
// Вендор: "cisco" | "mikrotik"
// Категории: используем компактный набор, чтобы удобно фильтровать

const commands = [
  // === CISCO: Общие ===
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "enable",
    description: "Переход в привилегированный режим EXEC"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "configure terminal",
    description: "Переход в режим глобальной конфигурации",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "hostname <name>",
    description: "Задать имя устройства",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show running-config",
    description: "Показать текущую конфигурацию"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show ip route",
    description: "Просмотр таблицы маршрутизации"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show ip interface brief",
    description: "Краткая информация по интерфейсам"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show interfaces",
    description: "Подробная информация об интерфейсах"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show vlan",
    description: "Список VLAN на устройстве"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show vtp status",
    description: "Состояние VTP домена"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "show interfaces status",
    description: "Краткий статус портов (коммутаторы)"
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "ping <ip>",
    description: "Проверка доступности узла",
    diag: true
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "traceroute <ip>",
    description: "Трассировка маршрута до узла",
    diag: true
  },
  {
    vendor: "cisco",
    category: "Общие",
    cmd: "?",
    description: "Контекстная подсказка по доступным командам"
  },

  // === CISCO: Интерфейсы ===
  {
    vendor: "cisco",
    category: "Интерфейсы",
    cmd: "interface e0/0",
    description: "Переход к настройке интерфейса",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "Интерфейсы",
    cmd: "description <text>",
    description: "Описание интерфейса",
    mode: "int"
  },
  {
    vendor: "cisco",
    category: "Интерфейсы",
    cmd: "ip address <ip> <mask>",
    description: "Назначение IPv4‑адреса интерфейсу",
    mode: "int"
  },
  {
    vendor: "cisco",
    category: "Интерфейсы",
    cmd: "no shutdown",
    description: "Включить интерфейс",
    mode: "int"
  },
  {
    vendor: "cisco",
    category: "Интерфейсы",
    cmd: "shutdown",
    description: "Отключить интерфейс",
    mode: "int",
    danger: true
  },
  {
    vendor: "cisco",
    category: "Интерфейсы",
    cmd: "interface range e0/1-2",
    description: "Одновременная настройка диапазона интерфейсов",
    mode: "config"
  },

  // === CISCO: VLAN / Switching ===
  {
    vendor: "cisco",
    category: "VLAN",
    cmd: "vlan 10",
    description: "Создать VLAN 10",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "VLAN",
    cmd: "name VLAN-10",
    description: "Задать имя VLAN",
    mode: "vlan"
  },
  {
    vendor: "cisco",
    category: "VLAN",
    cmd: "switchport mode access",
    description: "Перевести порт в режим access",
    mode: "int"
  },
  {
    vendor: "cisco",
    category: "VLAN",
    cmd: "switchport access vlan 10",
    description: "Назначить VLAN на access‑порт",
    mode: "int"
  },
  {
    vendor: "cisco",
    category: "VLAN",
    cmd: "switchport trunk encapsulation dot1q",
    description: "Задать тип trunk (dot1q)",
    mode: "int"
  },
  {
    vendor: "cisco",
    category: "VLAN",
    cmd: "switchport mode trunk",
    description: "Перевести порт в режим trunk",
    mode: "int"
  },

  // === CISCO: VTP ===
  {
    vendor: "cisco",
    category: "VTP",
    cmd: "vtp domain <name>",
    description: "Указать имя VTP домена",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "VTP",
    cmd: "vtp password <password>",
    description: "Пароль VTP домена",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "VTP",
    cmd: "vtp version 3",
    description: "Использовать версию VTP v3",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "VTP",
    cmd: "vtp mode server",
    description: "Режим VTP server",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "VTP",
    cmd: "vtp mode client",
    description: "Режим VTP client",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "VTP",
    cmd: "vtp primary",
    description: "Назначить коммутатор primary server",
    mode: "config"
  },

  // === CISCO: Subinterfaces ===
  {
    vendor: "cisco",
    category: "Subinterfaces",
    cmd: "interface e0/0.10",
    description: "Создать сабинтерфейс для VLAN 10",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "Subinterfaces",
    cmd: "encapsulation dot1q 10",
    description: "Включить VLAN‑tagging 10 на сабинтерфейсе",
    mode: "subint"
  },
  {
    vendor: "cisco",
    category: "Subinterfaces",
    cmd: "ip address 10.0.10.254 255.255.255.0",
    description: "IP‑адрес сабинтерфейса (SVI)",
    mode: "subint"
  },

  // === CISCO: DHCP ===
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "service dhcp",
    description: "Включить DHCP‑сервер на устройстве",
    mode: "config",
    danger: true
  },
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "ip dhcp pool VLAN-10",
    description: "Создать DHCP пул VLAN‑10",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "network 10.0.10.0 255.255.255.0",
    description: "Сеть, обслуживаемая пулом",
    mode: "dhcp"
  },
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "default-router 10.0.10.254",
    description: "Адрес шлюза (gateway) для клиентов",
    mode: "dhcp"
  },
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "dns-server 8.8.8.8",
    description: "DNS‑сервер для клиентов",
    mode: "dhcp"
  },
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "domain-name example.local",
    description: "Доменное имя для DHCP‑клиентов",
    mode: "dhcp"
  },
  {
    vendor: "cisco",
    category: "DHCP",
    cmd: "ip dhcp excluded-address 10.0.10.200 10.0.10.254",
    description: "Диапазон адресов, исключённых из раздачи",
    mode: "config"
  },

  // === CISCO: Статическая маршрутизация ===
  {
    vendor: "cisco",
    category: "Static Route",
    cmd: "ip route <network> <mask> <next-hop>",
    description: "Создать статический маршрут",
    mode: "config",
    danger: true
  },
  {
    vendor: "cisco",
    category: "Static Route",
    cmd: "ip route 10.11.11.0 255.255.255.252 30.30.3.2",
    description: "Пример статического маршрута",
    mode: "config"
  },

  // === CISCO: RIP ===
  {
    vendor: "cisco",
    category: "RIP",
    cmd: "router rip",
    description: "Перейти к настройке RIP",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "RIP",
    cmd: "version 2",
    description: "Использовать RIP v2",
    mode: "router"
  },
  {
    vendor: "cisco",
    category: "RIP",
    cmd: "network <network>",
    description: "Объявить сеть в RIP",
    mode: "router"
  },
  {
    vendor: "cisco",
    category: "RIP",
    cmd: "no auto-summary",
    description: "Отключить авто‑суммаризацию",
    mode: "router"
  },
  {
    vendor: "cisco",
    category: "RIP",
    cmd: "redistribute connected",
    description: "Распределить connected‑сети в RIP",
    mode: "router",
    danger: true
  },
  {
    vendor: "cisco",
    category: "RIP",
    cmd: "show ip rip database",
    description: "База маршрутов RIP",
    diag: true
  },

  // === CISCO: OSPF ===
  {
    vendor: "cisco",
    category: "OSPF",
    cmd: "router ospf 1",
    description: "Запуск процесса OSPF с ID 1",
    mode: "config"
  },
  {
    vendor: "cisco",
    category: "OSPF",
    cmd: "network 10.0.1.0 0.0.0.255 area 0",
    description: "Добавление сети в OSPF area 0",
    mode: "router"
  },
  {
    vendor: "cisco",
    category: "OSPF",
    cmd: "redistribute connected",
    description: "Распределение connected‑сетей в OSPF",
    mode: "router",
    danger: true
  },
  {
    vendor: "cisco",
    category: "OSPF",
    cmd: "redistribute rip",
    description: "Импорт маршрутов RIP в OSPF",
    mode: "router",
    danger: true
  },
  {
    vendor: "cisco",
    category: "OSPF",
    cmd: "show ip ospf neighbor",
    description: "Показать соседей OSPF",
    diag: true
  },
  {
    vendor: "cisco",
    category: "OSPF",
    cmd: "show running-config | section ospf",
    description: "Показать секцию конфигурации OSPF",
    diag: true
  },

  // === CISCO: Redistribute (общее) ===
  {
    vendor: "cisco",
    category: "Redistribute",
    cmd: "router ospf 1\nredistribute rip",
    description: "OSPF перераспределяет маршруты из RIP",
    mode: "config",
    danger: true
  },
  {
    vendor: "cisco",
    category: "Redistribute",
    cmd: "router rip\nredistribute ospf 1 metric 1",
    description: "RIP импортирует маршруты OSPF с метрикой 1",
    mode: "config",
    danger: true
  },

  // === MIKROTIK: Общие ===
  {
    vendor: "mikrotik",
    category: "Общие",
    cmd: "/",
    description: "Перейти в корень CLI"
  },
  {
    vendor: "mikrotik",
    category: "Общие",
    cmd: "..",
    description: "Выйти на уровень выше"
  },
  {
    vendor: "mikrotik",
    category: "Общие",
    cmd: "print",
    description: "Показать текущую таблицу/список в выбранном разделе"
  },
  {
    vendor: "mikrotik",
    category: "Общие",
    cmd: "export",
    description: "Экспорт конфигурации текущего раздела или всего роутера"
  },
  {
    vendor: "mikrotik",
    category: "Общие",
    cmd: "/system identity set name=<name>",
    description: "Задать имя устройства"
  },

  // === MIKROTIK: Интерфейсы и IP ===
  {
    vendor: "mikrotik",
    category: "Интерфейсы и IP",
    cmd: "/ip address add address=10.0.2.1/24 interface=ether2",
    description: "Добавить IP‑адрес на интерфейс ether2"
  },
  {
    vendor: "mikrotik",
    category: "Интерфейсы и IP",
    cmd: "/ip address print",
    description: "Показать таблицу IP‑адресов",
    diag: true
  },
  {
    vendor: "mikrotik",
    category: "Интерфейсы и IP",
    cmd: "/ip address remove <number>",
    description: "Удалить запись IP‑адреса по номеру",
    danger: true
  },
  {
    vendor: "mikrotik",
    category: "Интерфейсы и IP",
    cmd: "/ip address set <number> address=<ip> interface=<iface>",
    description: "Изменить существующую запись IP‑адреса",
    danger: true
  },

  // === MIKROTIK: Статическая маршрутизация ===
  {
    vendor: "mikrotik",
    category: "Static Route",
    cmd: "/ip route add dst-address=10.0.0.0/24 gateway=10.0.2.1",
    description: "Добавить статический маршрут"
  },
  {
    vendor: "mikrotik",
    category: "Static Route",
    cmd: "/ip route print",
    description: "Показать таблицу маршрутов",
    diag: true
  },

  // === MIKROTIK: RIP ===
  {
    vendor: "mikrotik",
    category: "RIP",
    cmd: "/routing rip network add network=11.0.1.0/24",
    description: "Добавить сеть в процесс RIP"
  },
  {
    vendor: "mikrotik",
    category: "RIP",
    cmd: "/routing rip interface print",
    description: "Показать интерфейсы RIP",
    diag: true
  },
  {
    vendor: "mikrotik",
    category: "RIP",
    cmd: "/routing rip neighbor print",
    description: "Показать RIP соседей",
    diag: true
  },

  // === MIKROTIK: OSPF ===
  {
    vendor: "mikrotik",
    category: "OSPF",
    cmd: "/routing ospf instance print",
    description: "Просмотр OSPF инстансов",
    diag: true
  },
  {
    vendor: "mikrotik",
    category: "OSPF",
    cmd: "/routing ospf network add network=10.0.2.0/24 area=backbone",
    description: "Добавить сеть в зону backbone"
  },
  {
    vendor: "mikrotik",
    category: "OSPF",
    cmd: "/routing ospf area add name=AREA-1 area-id=0.0.0.1",
    description: "Создать область OSPF"
  },
  {
    vendor: "mikrotik",
    category: "OSPF",
    cmd: "/routing ospf neighbor print",
    description: "Список соседей OSPF",
    diag: true
  },

  // === MIKROTIK: Redistribute ===
  {
    vendor: "mikrotik",
    category: "Redistribute",
    cmd: "/routing ospf instance set numbers=0 redistribute-connected=as-type-1",
    description: "Распределять connected‑сети в OSPF как Type‑1 LSA",
    danger: true
  },

  // === MIKROTIK: Диагностика ===
  {
    vendor: "mikrotik",
    category: "Диагностика",
    cmd: "/tool ping <ip>",
    description: "Проверка доступности хоста",
    diag: true
  },
  {
    vendor: "mikrotik",
    category: "Диагностика",
    cmd: "/tool traceroute <ip>",
    description: "Трассировка до узла",
    diag: true
  },
  {
    vendor: "mikrotik",
    category: "Диагностика",
    cmd: "/interface print",
    description: "Список интерфейсов",
    diag: true
  }

  // Здесь можно продолжить расширение: NAT, ACL, STP, EtherChannel и т.п.
];

// Сценарии настройки: последовательности команд «как в жизни»
const scenarios = [
  {
    vendor: "cisco",
    title: "Базовая подготовка маршрутизатора Cisco",
    description: "Имя, базовая диагностика и проверка интерфейсов.",
    steps: [
      { cmd: "enable", note: "Войти в привилегированный режим." },
      { cmd: "configure terminal", note: "Перейти в режим конфигурации." },
      { cmd: "hostname R1", note: "Задать имя устройства." },
      { cmd: "show ip interface brief", note: "Проверить состояние интерфейсов." },
      { cmd: "show ip route", note: "Посмотреть текущую таблицу маршрутизации." }
    ]
  },
  {
    vendor: "cisco",
    title: "Настройка L3‑коммутатора с VLAN и DHCP",
    description:
      "Создание VLAN, SVI, включение DHCP‑сервера и базовая проверка.",
    steps: [
      { cmd: "enable", note: "Привилегированный режим." },
      { cmd: "configure terminal", note: "Режим глобальной конфигурации." },
      { cmd: "vlan 10", note: "Создать VLAN 10." },
      { cmd: "name VLAN-10", note: "Задать имя VLAN." },
      { cmd: "interface e0/0.10", note: "Создать сабинтерфейс для VLAN 10." },
      {
        cmd: "encapsulation dot1q 10",
        note: "Включить tagging VLAN 10 на сабинтерфейсе."
      },
      {
        cmd: "ip address 10.0.10.254 255.255.255.0",
        note: "Назначить адрес шлюза для VLAN 10."
      },
      { cmd: "no shutdown", note: "Включить интерфейс." },
      { cmd: "service dhcp", note: "Разрешить работу DHCP‑сервера." },
      { cmd: "ip dhcp pool VLAN-10", note: "Создать DHCP‑пул." },
      {
        cmd: "network 10.0.10.0 255.255.255.0",
        note: "Указать сеть для пула."
      },
      {
        cmd: "default-router 10.0.10.254",
        note: "Указать адрес шлюза для клиентов."
      },
      { cmd: "dns-server 8.8.8.8", note: "DNS‑сервер для клиентов." },
      {
        cmd: "ip dhcp excluded-address 10.0.10.200 10.0.10.254",
        note: "Исключить адреса из выдачи."
      },
      {
        cmd: "show ip interface brief",
        note: "Проверить, что интерфейсы и SVI активны."
      }
    ]
  },
  {
    vendor: "cisco",
    title: "Статическая маршрутизация между двумя маршрутизаторами",
    description: "Простейший пример статической маршрутизации.",
    steps: [
      { cmd: "enable", note: "Войти в привилегированный режим." },
      { cmd: "configure terminal", note: "Режим конфигурации." },
      {
        cmd: "interface e0/0",
        note: "Перейти на интерфейс, смотрящий к соседу."
      },
      {
        cmd: "ip address 30.30.3.1 255.255.255.252",
        note: "Задать адрес линка до соседа."
      },
      { cmd: "no shutdown", note: "Включить линк." },
      {
        cmd: "ip route 10.11.11.0 255.255.255.252 30.30.3.2",
        note: "Добавить статический маршрут к удалённой сети."
      },
      { cmd: "show ip route", note: "Проверить наличие статического маршрута." },
      { cmd: "ping 10.11.11.1", note: "Проверить достигнута ли удалённая сеть." }
    ]
  },
  {
    vendor: "cisco",
    title: "Базовая настройка RIP v2",
    description: "Включение RIP v2 и объявление сетей.",
    steps: [
      { cmd: "enable", note: "Привилегированный режим." },
      { cmd: "configure terminal", note: "Режим конфигурации." },
      { cmd: "router rip", note: "Перейти в контекст RIP." },
      { cmd: "version 2", note: "Использовать RIP v2." },
      { cmd: "no auto-summary", note: "Отключить авто‑суммаризацию." },
      { cmd: "network 10.0.0.0", note: "Объявить свои сети (пример)." },
      {
        cmd: "show ip rip database",
        note: "Проверить, какие сети известны RIP."
      }
    ]
  },
  {
    vendor: "cisco",
    title: "Базовая настройка OSPF",
    description: "Создание процесса OSPF и добавление сети в area 0.",
    steps: [
      { cmd: "enable", note: "Привилегированный режим." },
      { cmd: "configure terminal", note: "Режим конфигурации." },
      { cmd: "router ospf 1", note: "Создать процесс OSPF с ID 1." },
      {
        cmd: "network 10.0.1.0 0.0.0.255 area 0",
        note: "Добавить сеть в backbone‑зону."
      },
      {
        cmd: "show ip ospf neighbor",
        note: "Проверить состояние соседств."
      },
      {
        cmd: "show running-config | section ospf",
        note: "Просмотреть конфигурацию OSPF."
      }
    ]
  },
  {
    vendor: "mikrotik",
    title: "Базовая настройка роутера MikroTik",
    description: "Имя устройства и базовый IP для управления.",
    steps: [
      {
        cmd: "/system identity set name=R1",
        note: "Задать имя устройства."
      },
      {
        cmd: "/ip address add address=10.0.2.1/24 interface=ether2",
        note: "Присвоить IP интерфейсу для доступа."
      },
      {
        cmd: "/ip address print",
        note: "Проверить, что адрес применился."
      }
    ]
  },
  {
    vendor: "mikrotik",
    title: "Статическая маршрутизация MikroTik",
    description: "Добавление простого статического маршрута.",
    steps: [
      {
        cmd: "/ip route add dst-address=10.0.0.0/24 gateway=10.0.2.1",
        note: "Создать маршрут до удалённой сети."
      },
      {
        cmd: "/ip route print",
        note: "Проверить таблицу маршрутизации."
      }
    ]
  },
  {
    vendor: "mikrotik",
    title: "Базовая настройка RIP на MikroTik",
    description: "Добавление сети и проверка интерфейсов/соседей.",
    steps: [
      {
        cmd: "/routing rip network add network=11.0.1.0/24",
        note: "Объявить сеть в RIP."
      },
      {
        cmd: "/routing rip interface print",
        note: "Посмотреть, какие интерфейсы участвуют в RIP."
      },
      {
        cmd: "/routing rip neighbor print",
        note: "Проверить RIP‑соседей."
      }
    ]
  },
  {
    vendor: "mikrotik",
    title: "Базовая настройка OSPF на MikroTik",
    description: "Добавление сети и области OSPF, проверка соседей.",
    steps: [
      {
        cmd: "/routing ospf area add name=AREA-1 area-id=0.0.0.1",
        note: "Создать нестандартную область."
      },
      {
        cmd: "/routing ospf network add network=10.0.2.0/24 area=backbone",
        note: "Добавить сеть в backbone‑зону."
      },
      {
        cmd: "/routing ospf instance print",
        note: "Проверить OSPF‑инстансы."
      },
      {
        cmd: "/routing ospf neighbor print",
        note: "Посмотреть состояние соседей."
      }
    ]
  }
];

// Нормативно‑правовые акты (законы по частям)
const laws = [
  {
    id: "152-fz",
    shortTitle: "152-ФЗ «О персональных данных»",
    title: "Федеральный закон №152-ФЗ «О персональных данных»",
    description:
      "Общие правила обработки и защиты персональных данных, обязанности операторов и права граждан.",
    parts: [
      {
        id: "part-1",
        title: "Часть 1. Общий обзор и практическое значение",
        content:
          "152-ФЗ от 27.07.2006 \"О персональных данных\" \n" +
          "Это главный закон, который обязывает компании правильно работать с личными данными клиентов и сотрудников.\n" +
          " Что считается персональными данными (ПДн)?\n" +
          "Это любая информация, по которой можно идентифицировать человека:\n" +
          "- ФИО, телефон, email;\n" +
          "- паспортные данные, СНИЛС;\n" +
          "- биометрия (отпечатки пальцев, фото лица);\n" +
          "- геолокация, IP-адрес (если можно определить человека);\n" +
          "- даже ники в соцсетях (если они привязаны к реальной личности).\n" +
          "❗ Что изменилось в 2024–2025 годах?\n" +
          "- Жёстче штрафы – до 500 тыс. руб. для юрлиц за утечку.\n" +
          "- Обязательное уведомление РКН о некоторых утечках (если данные попали к мошенникам).\n" +
          "- Запрет на передачу ПДн в \"недружественные\" страны без согласия человека.\n" +
          "- Биометрия под особым контролем – теперь её нельзя собирать просто так, нужно чёткое согласие.\n" +
          " Основные правила работы с ПДн\n" +
          "1. Согласие на обработку\n" +
          "Нельзя просто взять и записать данные клиента – нужно получить его согласие (письменно или через галочку на сайте).\n" +
          "В согласии должны быть указаны:\n" +
          "- Какие данные собираетесь обрабатывать;\n" +
          "- Для чего (например, \"для доставки заказа\");\n" +
          "- Срок хранения (например, \"3 года после покупки\").\n" +
          "2. Защита данных\n" +
          "Обязательно нужно хранить ПДн в защищённом виде:\n" +
          "- Шифрование (например, SSL на сайте);\n" +
          "- Ограничение доступа (только нужные сотрудники);\n" +
          "- Защита от утечек (DLP-системы).\n" +
          "3. Уведомление Роскомнадзора\n" +
          "Если обрабатываете ПДн на компьютерах (а не только в бумажном виде), нужно отправить уведомление в РКН.\n" +
          "Исключения:\n" +
          "- Данные только для трудового договора;\n" +
          "- Данные только в бумажном виде (например, анкеты в архиве).\n" +
          "4. Передача данных третьим лицам\n" +
          "Нельзя передавать ПДн партнёрам без согласия человека.\n" +
          "Если передаёте данные в облако (например, Яндекс.Облако), оно должно хранить их только в России.\n" +
          " Кому нужно соблюдать 152-ФЗ?\n" +
          "Всем, кто работает с ПДн:\n" +
          "- Интернет-магазины (данные покупателей);\n" +
          "- Банки и страховые (клиентские базы);\n" +
          "- Работодатели (данные сотрудников);\n" +
          "- Даже маленькие ИП (если берут телефоны клиентов для записи).\n" +
          " Штрафы за нарушения\n" +
          "Нет согласия на обработку – до 75 тыс. руб. для ИП, до 300 тыс. руб. для компаний.\n" +
          "Утечка данных – до 500 тыс. руб. + блокировка сайта.\n" +
          "Передача данных за рубеж – до 6 млн руб. для юрлиц.\n" +
          " Что делать прямо сейчас?\n" +
          "- Проверить, какие ПДн вы собираете (например, телефоны на сайте).\n" +
          "- Добавить форму согласия (галочку \"Я согласен на обработку данных\").\n" +
          "- Зашифровать базы данных (хотя бы паролями).\n" +
          "- Отправить уведомление в РКН, если ещё не сделали.\n" +
          "Пример из жизни\n" +
          "Ситуация: Магазин записывал телефоны клиентов в Excel-файл → файл попал в интернет → РКН оштрафовал на 150 тыс. руб.\n" +
          "Решение:\n" +
          "- Настроили сбор согласий через форму на сайте;\n" +
          "- Перешли на защищённый CRM;\n" +
          "- Отправили уведомление в РКН.\n" +
          "Итог: Штрафов больше не было."
      },
      {
        id: "part-2",
        title: "Часть 2. Разбор ключевых норм закона",
        content:
          "152-ФЗ \"О персональных данных\" –  разбор закона\n" +
          "1. Основные понятия закона\n" +
          "Закон вводит ключевые определения:\n" +
          "- Персональные данные (ПДн) - любая информация, относящаяся к прямо или косвенно определенному физическому лицу\n" +
          "- Оператор - организация/ИП/физлицо, обрабатывающие ПДн\n" +
          "- Обработка ПДн - любое действие с данными (сбор, запись, хранение, передача и т.д.)\n" +
          "2. Принципы обработки данных\n" +
          "Закон устанавливает 7 базовых принципов:\n" +
          "- Законность и справедливость - нельзя обрабатывать данные без оснований\n" +
          "- Ограничение цели - только для заранее определенных целей\n" +
          "- Минимизация данных - только необходимый объем информации\n" +
          "- Достоверность - актуальные и точные данные\n" +
          "- Ограничение хранения - не дольше требуемого срока\n" +
          "- Конфиденциальность - защита от несанкционированного доступа\n" +
          "- Ответственность - оператор отвечает за соблюдение требований\n" +
          "3. Права субъектов ПДн\n" +
          "Граждане имеют право:\n" +
          "- На доступ к своим данным\n" +
          "- На уточнение и блокировку данных\n" +
          "- На удаление данных (право на забвение)\n" +
          "- На отзыв согласия на обработку\n" +
          "- На защиту своих прав в суде\n" +
          "4. Обязанности операторов\n" +
          "Операторы должны:\n" +
          "- Получать письменное согласие на обработку (кроме исключений)\n" +
          "- Обеспечивать конфиденциальность данных\n" +
          "- Уведомлять Роскомнадзор о начале обработки\n" +
          "- Назначать ответственного за обработку ПДн\n" +
          "- Вести реестр обрабатываемых данных\n" +
          "- Принимать организационные и технические меры защиты\n" +
          "5. Особые категории данных\n" +
          "Отдельно регулируется обработка:\n" +
          "- Биометрических данных (требуется отдельное согласие)\n" +
          "- Специальных категорий (раса, здоровье, сексуальная жизнь и др.)\n" +
          "- Данных несовершеннолетних (согласие родителей для детей до 14 лет)\n" +
          "6. Трансграничная передача\n" +
          "Разрешается только при условиях:\n" +
          "- В страны с адекватной защитой данных\n" +
          "- При наличии согласия субъекта\n" +
          "- Для исполнения договора с субъектом\n" +
          "- В предусмотренных законом случаях\n" +
          "7. Ответственность за нарушения\n" +
          "Виды ответственности:\n" +
          "- Административная (штрафы до 6 млн руб.)\n" +
          "- Гражданско-правовая (компенсация морального вреда)\n" +
          "- Уголовная (при серьезных нарушениях)\n" +
          "8. Изменения 2023-2024 годов\n" +
          "Ключевые нововведения:\n" +
          "- Обязательное уведомление субъектов и РКН об утечках\n" +
          "- Запрет передачи данных в недружественные страны без согласия\n" +
          "- Ужесточение требований к биометрии\n" +
          "- Расширение полномочий Роскомнадзора\n" +
          "- Новые штрафные санкции за нарушения\n" +
          "9. Практическое применение\n" +
          "Для бизнеса это означает необходимость:\n" +
          "- Провести аудит текущих процессов обработки ПДн\n" +
          "- Разработать внутренние регламенты\n" +
          "- Внедрить технические средства защиты\n" +
          "- Обучить сотрудников\n" +
          "- Вести документооборот (согласия, уведомления и т.д.)\n" +
          "10. Исключения из закона\n" +
          "Закон не распространяется на случаи:\n" +
          "- Обработки данных для личных нужд\n" +
          "- Обработки госорганами в целях безопасности\n" +
          "- Обработки анонимизированных данных\n" +
          "- Некоторых случаев журналистской деятельности\n" +
          "Для полного соответствия требованиям закона рекомендуется:\n" +
          "- Разработать Политику обработки ПДн\n" +
          "- Внедрить программу внутреннего контроля\n" +
          "- Регулярно обновлять меры защиты\n" +
          "- Вести журнал обработки ПДн\n" +
          "- Проводить регулярные проверки на соответствие\n" +
          "Закон постоянно обновляется, поэтому важно отслеживать изменения и своевременно вносить коррективы в процессы обработки данных."
      }
    ]
  },
  {
    id: "149-fz",
    shortTitle: "149-ФЗ «Об информации, информационных технологиях и о защите информации»",
    title:
      "Федеральный закон №149-ФЗ «Об информации, информационных технологиях и о защите информации»",
    description:
      "Базовый закон о регулировании информации, информационных систем и защите информации в РФ.",
    parts: [
      {
        id: "part-1",
        title: "Часть 1. Общий обзор и ключевые положения",
        content:
          "Федеральный закон от 27.07.2006 № 149-ФЗ \"Об информации, информационных технологиях и о защите информации\" — это ключевой нормативный акт, регулирующий отношения в цифровом пространстве России. \n" +
          "📌 Структура и основные положения закона\n" +
          "1. Сфера регулирования (ст. 1-2)\n" +
          "Регулирует:\n" +
          "- Оборот информации в РФ\n" +
          "- Применение информационных технологий\n" +
          "- Защиту информации\n" +
          "Отношения между:\n" +
          "- Государством\n" +
          "- Операторами информационных систем\n" +
          "- Пользователями\n" +
          "2. Ключевые понятия (ст. 2)\n" +
          "- Информация — любые сведения независимо от формы представления\n" +
          "- Информационная система — совокупность информации и ИТ-инфраструктуры\n" +
          "- Оператор информационной системы — лицо, осуществляющее ее эксплуатацию\n" +
          "- Доступ к информации — возможность получения сведений\n" +
          "3. Государственное регулирование (ст. 8-13)\n" +
          "- Единая информационная система госорганов\n" +
          "- Обязательная идентификация пользователей в определенных случаях\n" +
          "- Реестры информационных ресурсов (ст. 15.1)\n" +
          "4. Ограничения (ст. 15-15.7)\n" +
          "Закон вводит:\n" +
          "- Блокировку ресурсов за распространение запрещенной информации\n" +
          "- Обязательное хранение данных (ст. 10.1 \"Закон Яровой\")\n" +
          "- Запрет анонимности для организаторов распространения информации\n" +
          " Защита информации (ст. 16-19)\n" +
          "- Лицензирование деятельности по защите информации\n" +
          "- Сертификация средств защиты\n" +
          "- Контроль со стороны ФСТЭК, ФСБ, Роскомнадзора\n" +
          " Ответственность\n" +
          "Нарушения закона влекут:\n" +
          "- Административные штрафы (до 1 млн руб. для юрлиц)\n" +
          "- Блокировку ресурсов\n" +
          "- Уголовную ответственность (ст. 272-274 УК РФ)\n" +
          " Актуальные изменения (2023-2024)\n" +
          "- Закон о VPN (обязательная фильтрация трафика)\n" +
          "- Регулирование нейросетей (обязательная маркировка контента)\n" +
          "- Расширение перечня запрещенной информации\n" +
          " Практическое применение\n" +
          "Примеры:\n" +
          "- Блокировка мессенджеров за отказ локализовать данные\n" +
          "- Требования к соцсетям (удаление запрещенного контента)\n" +
          "- Обязательная идентификация на госуслугах\n" +
          "Закон постоянно дополняется — с 2006 года внесено более 120 поправок. Для точного применения требуется проверка актуальной редакции в СПС \"КонсультантПлюс\"."
      },
      {
        id: "part-2",
        title: "Часть 2. Структура и применение норм 149-ФЗ",
        content:
          "Структура и содержание Федерального закона № 149-ФЗ\n" +
          " Основные понятия (ст. 2):\n" +
          "- Информация — сведения (сообщения, данные) независимо от формы их представления.\n" +
          "- Информационные технологии — процессы, методы поиска, сбора, хранения, обработки, предоставления, распространения информации.\n" +
          "- Владелец информации — лицо, самостоятельно создавшее информацию либо получившее право разрешать или ограничивать доступ к ней.\n" +
          "- Конфиденциальность информации — обязательное для выполнения требование не передавать информацию третьим лицам без согласия её владельца.\n" +
          " Классификация информации (ст. 5):\n" +
          "- Общедоступная информация — та, что доступна всем (например, новости, госстатистика).\n" +
          "Информация с ограниченным доступом:\n" +
          "- Государственная тайна (регулируется отдельно).\n" +
          "- Коммерческая тайна (секреты производства).\n" +
          "- Персональные данные (регулируются 152-ФЗ).\n" +
          "- Профессиональная тайна (врачебная, нотариальная и т.д.).\n" +
          " Защита информации (ст. 16):\n" +
          "Цель защиты — предотвращение утечки, хищения, искажения, подделки информации.\n" +
          "Меры защиты:\n" +
          "- Определение угроз безопасности информации.\n" +
          "- Принятие правовых, организационных и технических мер защиты.\n" +
          "- Контроль за соблюдением требований к защите информации.\n" +
          " Особенности распространения информации в интернете (ст. 10.1, 15.1-15.6):\n" +
          "Запрещена распространение информации:\n" +
          "- Призывы к экстремизму и терроризму.\n" +
          "- Порнография с участием несовершеннолетних.\n" +
          "- Информация о способах самоубийства, наркотиках.\n" +
          "- Клевета и недостоверная информация.\n" +
          "Правила для операторов:\n" +
          "- Хранить информацию о фактах приема, передачи, доставки голосовой информации, письменных текстов, изображений, звуков, видео или иных электронных сообщений пользователей в течение 3 лет (ст. 10.1).\n" +
          "- Предоставлять информацию правоохранительным органам по запросу (ст. 11).\n" +
          "- Ограничивать доступ к запрещенной информации на основании ресура Роскомнадзора.\n" +
          " Обязанности операторов информационных систем (ст. 13, 14, 15.4):\n" +
          "Уведомление Роскомнадзора о начале обработки персональных данных (для некоторых случаев).\n" +
          "Обеспечение конфиденциальности персональных данных.\n" +
          "Блокировка незаконной информации по требованию уполномоченных органов.\n" +
          "Хранение и предоставление информации о деятельности пользователей по запросу правоохранительных органов.\n" +
          " Ответственность за нарушение (ст. 17):\n" +
          "Нарушение требований закона влечет:\n" +
          "Административную ответственность (по КоАП РФ):\n" +
          "- Ст. 13.11 — Нарушение порядка сбора, хранения, использования или распространения информации о гражданах (персональных данных). Штраф для юрлиц — до 75 тыс. руб..\n" +
          "- Ст. 13.12 — Нарушение правил защиты информации. Штраф для юрлиц — до 50 тыс. руб. с конфискацией нарушающих средств.\n" +
          "- Ст. 13.14 — Разглашение информации с ограниченным доступом. Штраф для граждан — до 5 тыс. руб., для должностных лиц — до 40 тыс. руб..\n" +
          "Уголовную ответственность (по УК РФ):\n" +
          "- Ст. 137 — Нарушение неприкосновенности частной жизни (до 4 лет лишения свободы).\n" +
          "- Ст. 140 — Отказ в предоставлении информации гражданину (до 80 тыс. руб. штрафа).\n" +
          "- Ст. 272 — Неправомерный доступ к компьютерной информации (до 7 лет лишения свободы).\n" +
          "- Ст. 273 — Создание, использование и распространение вредоносных программ (до 7 лет лишения свободы).\n" +
          "- Ст. 274 — Нарушение правил эксплуатации средств хранения, обработки или передачи компьютерной информации (до 5 лет лишения свободы).\n" +
          " Что важно запомнить:\n" +
          "Закон 149-ФЗ — это рамочный закон. Он устанавливает общие правила, но многие вопросы детализируются другими законами (например, 152-ФЗ о персональных данных).\n" +
          "Анонимность в интернете в РФ условна: операторы обязаны хранить информацию о действиях пользователей и предоставлять её по запросу правоохранительных органов.\n" +
          "Запрещено распространять целый ряд информации — от экстремизма до клеветы.\n" +
          "За нарушения — серьезная ответственность, вплоть до уголовной."
      }
    ]
  }
];

// === Состояние и элементы DOM ===

const state = {
  section: "network", // "network" | "laws"
  vendor: "cisco",
  search: "",
  activeCategories: new Set(),
  view: "commands", // "commands" | "scenarios" (для раздела сетевых технологий)
  lawsView: "library", // "library" | "document"
  currentLawId: null,
  currentLawPage: 0
};

const commandsContainer = document.getElementById("commandsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFiltersContainer = document.getElementById("categoryFilters");
const resetFiltersBtn = document.getElementById("resetFilters");
const vendorButtons = document.querySelectorAll(".vendor-btn");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const currentVendorTitle = document.getElementById("currentVendorTitle");
const resultsCount = document.getElementById("resultsCount");
const themeToggle = document.getElementById("themeToggle");
const viewCommandsBtn = document.getElementById("viewCommandsBtn");
const viewScenariosBtn = document.getElementById("viewScenariosBtn");
const sectionNetworkBtn = document.getElementById("sectionNetworkBtn");
const sectionLawsBtn = document.getElementById("sectionLawsBtn");

// === Тема (light/dark) ===

function loadTheme() {
  const saved = localStorage.getItem("cheatsheet-theme");
  if (saved === "dark") {
    document.body.classList.add("theme-dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("theme-dark");
    themeToggle.textContent = "🌙";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("theme-dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("cheatsheet-theme", isDark ? "dark" : "light");
}

themeToggle.addEventListener("click", toggleTheme);
loadTheme();

// === Построение фильтров и рендера команд ===

function getCategoriesForVendor(vendor) {
  const set = new Set();
  for (const c of commands) {
    if (c.vendor === vendor) set.add(c.category);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
}

function buildCategoryFilters() {
  if (state.section !== "network" || state.view === "scenarios") {
    categoryFiltersContainer.innerHTML = "";
    return;
  }
  categoryFiltersContainer.innerHTML = "";
  const categories = getCategoriesForVendor(state.vendor);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip";
    btn.dataset.category = cat;
    btn.innerHTML = `<span>●</span>${cat}`;

    if (state.activeCategories.size === 0 || state.activeCategories.has(cat)) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      if (state.activeCategories.has(cat)) {
        state.activeCategories.delete(cat);
      } else {
        state.activeCategories.add(cat);
      }
      render();
    });

    categoryFiltersContainer.appendChild(btn);
  });
}

function renderCommands() {
  if (state.section !== "network") return;
  const term = state.search.trim().toLowerCase();
  const useCategoryFilter = state.activeCategories.size > 0;

  const filtered = commands.filter((item) => {
    if (item.vendor !== state.vendor) return false;

    if (useCategoryFilter && !state.activeCategories.has(item.category)) {
      return false;
    }

    if (!term) return true;

    const haystack = `${item.cmd} ${item.description} ${item.category}`.toLowerCase();
    return haystack.includes(term);
  });

  commandsContainer.innerHTML = "";

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "command-card";

    const header = document.createElement("div");
    header.className = "command-header";

    const cat = document.createElement("div");
    cat.className = "command-category";
    cat.textContent = item.category;

    const badges = document.createElement("div");
    badges.className = "command-badges";

    if (item.mode) {
      const b = document.createElement("span");
      b.className = "badge badge-mode";
      b.textContent = item.mode;
      badges.appendChild(b);
    }
    if (item.danger) {
      const b = document.createElement("span");
      b.className = "badge badge-danger";
      b.textContent = "!";
      badges.appendChild(b);
    }
    if (item.diag) {
      const b = document.createElement("span");
      b.className = "badge badge-info";
      b.textContent = "diag";
      badges.appendChild(b);
    }

    header.appendChild(cat);
    if (badges.children.length > 0) header.appendChild(badges);

    const code = document.createElement("pre");
    code.className = "command-code";
    code.textContent = item.cmd;

    const desc = document.createElement("div");
    desc.className = "command-description";
    desc.textContent = item.description;

    card.appendChild(header);
    card.appendChild(code);
    card.appendChild(desc);

    commandsContainer.appendChild(card);
  });

  const labelVendor = state.vendor === "cisco" ? "Cisco" : "MikroTik";
  currentVendorTitle.textContent = `${labelVendor} — команды`;
  resultsCount.textContent = `${filtered.length} команд(ы) найдено`;
}

function renderScenarios() {
  if (state.section !== "network") return;
  const term = state.search.trim().toLowerCase();

  const filtered = scenarios.filter((scenario) => {
    if (scenario.vendor !== state.vendor) return false;
    if (!term) return true;

    const stepsText = scenario.steps
      .map((s) => `${s.cmd} ${s.note || ""}`)
      .join(" ");
    const haystack = `${scenario.title} ${scenario.description} ${stepsText}`.toLowerCase();
    return haystack.includes(term);
  });

  commandsContainer.innerHTML = "";

  filtered.forEach((scenario) => {
    const card = document.createElement("article");
    card.className = "scenario-card";

    const titleEl = document.createElement("div");
    titleEl.className = "scenario-title";
    titleEl.textContent = scenario.title;

    const descEl = document.createElement("div");
    descEl.className = "scenario-description";
    descEl.textContent = scenario.description;

    const ol = document.createElement("ol");
    ol.className = "scenario-steps";

    scenario.steps.forEach((step) => {
      const li = document.createElement("li");
      li.className = "scenario-step";
      const codeSpan = document.createElement("span");
      codeSpan.className = "scenario-step-code";
      codeSpan.textContent = step.cmd;
      const noteSpan = document.createElement("span");
      if (step.note) {
        noteSpan.textContent = ` — ${step.note}`;
      }
      li.appendChild(codeSpan);
      if (step.note) {
        li.appendChild(noteSpan);
      }
      ol.appendChild(li);
    });

    card.appendChild(titleEl);
    card.appendChild(descEl);
    card.appendChild(ol);

    commandsContainer.appendChild(card);
  });

  const labelVendor = state.vendor === "cisco" ? "Cisco" : "MikroTik";
  currentVendorTitle.textContent = `${labelVendor} — сценарии`;
  resultsCount.textContent = `${filtered.length} сценариев найдено`;
}

function renderLaws() {
  commandsContainer.innerHTML = "";
  const term = state.search.trim().toLowerCase();

  if (state.lawsView === "library") {
    // Сайдбар: список всех законов
    categoryFiltersContainer.innerHTML = "";
    laws.forEach((law) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip";
      btn.textContent = law.shortTitle;
      btn.addEventListener("click", () => {
        state.lawsView = "document";
        state.currentLawId = law.id;
        state.currentLawPage = 0;
        render();
      });
      categoryFiltersContainer.appendChild(btn);
    });

    const filtered = laws.filter((law) => {
      if (!term) return true;
      const haystack = `${law.title} ${law.shortTitle} ${law.description}`.toLowerCase();
      return haystack.includes(term);
    });

    filtered.forEach((law) => {
      const card = document.createElement("article");
      card.className = "scenario-card";

      const titleEl = document.createElement("div");
      titleEl.className = "scenario-title";
      titleEl.textContent = law.shortTitle;

      card.appendChild(titleEl);

      card.addEventListener("click", () => {
        state.lawsView = "document";
        state.currentLawId = law.id;
        state.currentLawPage = 0;
        render();
      });

      commandsContainer.appendChild(card);
    });

    currentVendorTitle.textContent = "Нормативно‑правовые акты — библиотека";
    resultsCount.textContent = `${filtered.length} документ(ов)`;
  } else {
    // Режим просмотра конкретного закона: в сайдбаре список частей
    const law =
      laws.find((x) => x.id === state.currentLawId) ||
      (laws.length > 0 ? laws[0] : null);

    if (!law) {
      currentVendorTitle.textContent = "Нормативно‑правовые акты";
      resultsCount.textContent = "0 документов";
      return;
    }

    const total = law.parts.length;

    categoryFiltersContainer.innerHTML = "";
    law.parts.forEach((part, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip";
      if (index === state.currentLawPage) {
        btn.classList.add("active");
      }
      btn.textContent = part.title;
      btn.addEventListener("click", () => {
        state.currentLawPage = index;
        render();
      });
      categoryFiltersContainer.appendChild(btn);
    });
    const pageIndex = Math.min(Math.max(state.currentLawPage, 0), total - 1);
    state.currentLawPage = pageIndex;
    const page = law.parts[pageIndex];

    const headerCard = document.createElement("article");
    headerCard.className = "scenario-card";

    const titleEl = document.createElement("div");
    titleEl.className = "scenario-title";
    titleEl.textContent = law.shortTitle;

    const descEl = document.createElement("div");
    descEl.className = "scenario-description";
    descEl.textContent = law.title;

    const navEl = document.createElement("div");
    navEl.className = "scenario-description";
    navEl.style.display = "flex";
    navEl.style.alignItems = "center";
    navEl.style.justifyContent = "space-between";
    navEl.style.gap = "8px";

    const pageLabel = document.createElement("span");
    pageLabel.textContent = `${page.title} (${pageIndex + 1} / ${total})`;

    const buttonsBox = document.createElement("div");
    buttonsBox.style.display = "flex";
    buttonsBox.style.gap = "6px";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.textContent = "Предыдущая часть";
    prevBtn.className = "view-toggle-btn";
    prevBtn.disabled = pageIndex === 0;
    if (prevBtn.disabled) {
      prevBtn.style.opacity = "0.6";
      prevBtn.style.cursor = "default";
    }
    prevBtn.addEventListener("click", () => {
      if (state.currentLawPage > 0) {
        state.currentLawPage -= 1;
        render();
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = "Следующая часть";
    nextBtn.className = "view-toggle-btn";
    nextBtn.disabled = pageIndex >= total - 1;
    if (nextBtn.disabled) {
      nextBtn.style.opacity = "0.6";
      nextBtn.style.cursor = "default";
    }
    nextBtn.addEventListener("click", () => {
      if (state.currentLawPage < total - 1) {
        state.currentLawPage += 1;
        render();
      }
    });

    buttonsBox.appendChild(prevBtn);
    buttonsBox.appendChild(nextBtn);

    navEl.appendChild(pageLabel);
    navEl.appendChild(buttonsBox);

    headerCard.appendChild(titleEl);
    headerCard.appendChild(descEl);
    headerCard.appendChild(navEl);

    const textCard = document.createElement("article");
    textCard.className = "scenario-card";
    const textEl = document.createElement("div");
    textEl.className = "law-text";

    const lines = page.content.split("\n");
    let currentList = null; // { type: "ul" | "ol", el: HTMLElement }

    const flushList = () => {
      if (currentList) {
        textEl.appendChild(currentList.el);
        currentList = null;
      }
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) return;

      // Маркированные списки: -, •, *
      const ulMatch = /^[-•*]\s+(.+)$/.exec(line);
      if (ulMatch) {
        const content = ulMatch[1];
        if (!currentList || currentList.type !== "ul") {
          flushList();
          const ul = document.createElement("ul");
          ul.className = "law-list law-list-ul";
          currentList = { type: "ul", el: ul };
        }
        const li = document.createElement("li");
        li.textContent = content;
        currentList.el.appendChild(li);
        return;
      }

      // Нумерованные заголовки (оставляем как подзаголовки, не списки)
      const isNumberedHeading = /^[0-9]+\.\s/.test(line);

      // Любая другая строка завершает текущий список
      flushList();

      const p = document.createElement("p");
      let classNames = "law-paragraph";
      const strong = document.createElement("strong");

      if (/^\d+\s*часть/i.test(line)) {
        classNames += " law-part-label";
        strong.textContent = line;
        p.appendChild(strong);
      } else if (line.includes("152-ФЗ") || line.includes("149-ФЗ")) {
        classNames += " law-law-title";
        strong.textContent = line;
        p.appendChild(strong);
      } else if (line.endsWith("?") || isNumberedHeading) {
        classNames += " law-subheading";
        strong.textContent = line;
        p.appendChild(strong);
      } else {
        p.textContent = line;
      }

      p.className = classNames;
      textEl.appendChild(p);
    });

    flushList();
    textCard.appendChild(textEl);

    commandsContainer.appendChild(headerCard);
    commandsContainer.appendChild(textCard);
    commandsContainer.appendChild(textCard);

    currentVendorTitle.textContent = `${law.shortTitle} — ${page.title}`;
    resultsCount.textContent = `${pageIndex + 1} / ${total} частей`;
  }
}

function render() {
  if (state.section === "network") {
    document.body.classList.remove("laws-section");
    if (searchSection) searchSection.style.display = "";
    buildCategoryFilters();
    if (state.view === "commands") {
      renderCommands();
    } else {
      renderScenarios();
    }
  } else {
    document.body.classList.add("laws-section");
    renderLaws();
  }
}

// === Обработчики ===

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

resetFiltersBtn.addEventListener("click", () => {
  state.activeCategories.clear();
  render();
});

sidebarToggle.addEventListener("click", () => {
  const collapsed = document.body.classList.toggle("sidebar-collapsed");
  sidebarToggle.classList.toggle("active", collapsed);
});

vendorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const v = btn.dataset.vendor;
    if (v === state.vendor) return;
    state.vendor = v;
    state.search = "";
    searchInput.value = "";
    state.activeCategories.clear();

    vendorButtons.forEach((b) => {
      b.classList.toggle("active", b.dataset.vendor === v);
      b.setAttribute("aria-selected", b.dataset.vendor === v ? "true" : "false");
    });

    render();
  });
});

sectionNetworkBtn.addEventListener("click", () => {
  if (state.section === "network") return;
  state.section = "network";
  sectionNetworkBtn.classList.add("active");
  sectionLawsBtn.classList.remove("active");
  // вернуть сетевой раздел в режим команд по умолчанию
  state.view = "commands";
  render();
});

sectionLawsBtn.addEventListener("click", () => {
  if (state.section === "laws") return;
  state.section = "laws";
  sectionLawsBtn.classList.add("active");
  sectionNetworkBtn.classList.remove("active");
  render();
});

viewCommandsBtn.addEventListener("click", () => {
  if (state.view === "commands") return;
  state.view = "commands";
  viewCommandsBtn.classList.add("active");
  viewScenariosBtn.classList.remove("active");
  render();
});

viewScenariosBtn.addEventListener("click", () => {
  if (state.view === "scenarios") return;
  state.view = "scenarios";
  viewScenariosBtn.classList.add("active");
  viewCommandsBtn.classList.remove("active");
  render();
});

// Первый рендер
render();

