# Native Mobile Course — Compose · SwiftUI · Kotlin Multiplatform

The curriculum for building one app, the **Native Device Monitor**, on Android and iOS, on top of shared Kotlin Multiplatform code. Four 5-day weeks of core lessons, one lesson per day, plus optional extensions. Work through the core lessons in order. Each lesson teaches one step, and from Lesson 05 on each one adds a **milestone** to your app.

## How this course works

- **Who it's for:** developers who already know a typed language, most likely TypeScript from Ionic/Angular work. Lessons 01–02 map what you know onto Kotlin and Swift instead of teaching programming from scratch.
- **Four weeks, one lesson a day.** The core lessons (01–20) fit four 5-day weeks: one lesson per working day, each at most about 2.5 h on the default UI track. Weekends stay free for catching up or an extension. The core lessons build the full app: KMP, declarative UI, architecture, permissions, the complete BLE flow, and background monitoring.
- **Start with Lesson 00.** A short introduction (10–15 minutes) and the course's front page: what you'll build, how the course works, and the map of every lesson. It counts for no day.
- **Optional extensions.** E1–E3 add a network client, camera/media and a BLE library comparison. Pick the ones your work needs.
- **One app, growing.** From Lesson 05 on, every lesson adds one milestone (`m00`…`m15`) to the same project. Each lesson's agent brief starts from the previous milestone. Extensions all start from the finished app (`m15`).
- **Choose your UI track.** Every UI-touching lesson has a switcher: Android `XML | Compose | Both`, iOS `UIKit | SwiftUI | Both`. **Compose + SwiftUI is the default** and the team's target. XML Views and UIKit are there because the team's app still contains that code. "Both" shows the tracks side by side, with a "what changed and why" note. The concept sections are shared by all tracks.
- **The shared code is always KMP.** Shared Kotlin holds the **app core** (models, ports, services), the shared ViewModels and the shared outbound adapters. Platform capabilities (BLE radio, permissions, camera, background scheduling) sit behind **outbound ports** (Kotlin interfaces). Android outbound adapters are Kotlin in `androidMain`. iOS outbound adapters are **Swift** implementing the Kotlin port.
- **Code authorship.** You may let an AI agent write the code, but never blind:
  1. Read the lesson's code walkthrough, or have your agent explain its code line by line.
  2. Answer the retrieval checks.
  3. Do the **unaided exercise** yourself. This step is not optional.
- **Agent brief.** Every lesson ends with a copy-paste brief: the starting milestone, the behaviour to build for your track, the files involved, and acceptance checks. Hand it to your agent, or follow it yourself.
- **Estimates, not dates.** Each lesson header reads like `~2 h · +0.5 h per extra UI track`. No lesson is longer than about 2.5 h on the default track, and every lesson ends at a natural stop: a passing build or a finished exercise.

## Environment

- macOS with the latest stable Xcode and Android Studio (with the Kotlin Multiplatform plugin), and JDK 17+.
- **A physical Android phone and a physical iPhone** for everything BLE (from Lesson 13). The iOS Simulator reports Bluetooth as `.unsupported`, and the Android emulator has no Bluetooth radio. UI-only lessons run fine on simulator/emulator.
- **BLE test peripheral:** the LightBlue app on a Mac, set up as a virtual peripheral with one readable and one notifying characteristic. Set up in Lesson 13.
- Minimum OS versions: Android minSdk 26; iOS 17 (needed for SwiftUI `@Observable`; the UIKit track uses the same target).
- Library versions are pinned in the lesson that introduces each library, not here.

## Architecture you'll end up with

The app is built as **hexagonal architecture** (ports and adapters). The **app core** sits in the middle and imports nothing from Android, iOS or any framework. Everything else is an **adapter** plugged into one of its **ports**.

```
                Compose │ XML Views UI        SwiftUI │ UIKit UI        ← thin: render state, forward events
                        └──────────┬────────────────┘
                                   ▼
   INBOUND ADAPTERS     shared ViewModels (StateFlow<UiState>; Swift sees Flows via SKIE) · tests
                                   │  call only inbound ports
                                   ▼
          ┌──────────────────────── APP CORE (commonMain) ─────────────────────────┐
          │  inbound ports   DeviceScanning · DeviceSession · PermissionAccess ·   │
          │                  StatusReport · DeviceMonitoring                       │
          │  services        implement the inbound ports: the app's rules          │
          │  models          Device · ConnectionState · DeviceStatus · LogRecord … │
          │  outbound ports  BleScanner · BleConnection · PermissionChecker ·      │
          │                  BatteryProvider · NetworkProvider ·                   │
          │                  BluetoothProvider · LogStore · MonitorScheduler       │
          └───────────────────────────────────┬────────────────────────────────────┘
                                              │  implemented by
             ┌────────────────────────────────┼──────────────────────────────┐
             ▼                                ▼                              ▼
   OUTBOUND ADAPTERS, Android      OUTBOUND ADAPTERS, shared       OUTBOUND ADAPTERS, iOS
   Kotlin in androidMain           Kotlin in commonMain            Swift in the iOS app
   BluetoothGatt · ActivityResult  simulated scanner ·             CoreBluetooth · AVFoundation ·
   · WorkManager                   Ktor HTTP client (E1)           BGTaskScheduler
                                                                   (+ one Kotlin/Native adapter
                                                                   in iosMain: the log store)

             └──────── wired with Koin: inbound port → service, outbound port → adapter ────────┘
```

- **Shared code** (`shared/src/commonMain`) is organised as `core` (models, `inbound` ports, `outbound` ports, services), the inbound adapters (shared ViewModels), the shared outbound adapters, and the DI module. The packages are named `inbound` / `outbound` because `in` is a Kotlin keyword.
- **Inbound ports** say what the app offers, one per capability. **Outbound ports** say what the app needs, named in the app's terms (never HTTP, GATT or files).
- **One rule for where code goes:** UI code goes in the screen; logic that is a rule of the app goes in a service; anything that talks to a platform, a library or the network goes in an outbound adapter behind an outbound port. ViewModels talk only to inbound ports.
- **Tests** are inbound adapters too: they drive a service through its inbound port, with **fakes** (outbound adapters written for tests, in `commonTest`) behind its outbound ports.

---

## Core lessons

**Lesson 00 — Introduction** (~10–15 min, no day, no milestone): what you'll build, how the course works, and this map. Read it once before Lesson 01.

Milestone tags (`m00`…`m15`) mark each lesson's finished app. Lessons 01–04 are scratch programs and apps and take no milestone.

### Week 1 — Languages, platforms, KMP (~10 h)

| Day | # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|---|
| 1 | 01 | **Kotlin for TypeScript developers** | val/var, functions, classes/interfaces/data classes, null safety, collections and lambdas, extension functions, coroutines and `Flow` (`suspend`, scopes, `StateFlow`). Each idea mapped from its TypeScript equivalent, with time spent on what has no TS counterpart | scratch program | ~2 h |
| 2 | 02 | **Swift for TypeScript developers** | let/var, struct vs class, protocols, optionals, closures, async/await, `AsyncSequence`, `@MainActor`, each mapped from TypeScript | scratch program | ~2 h |
| 3 | 03 | **Android fundamentals** | project structure, Activity, Context, Intent, Manifest, lifecycle (Home vs rotation), Gradle; Java reading via a cheatsheet | scratch app logging lifecycles | ~1.75 h |
| 4 | 04 | **iOS fundamentals** | Xcode project, Info.plist, frameworks, **two lifecycles** (app/scene vs view). *Track:* SwiftUI `App` + `scenePhase` · UIKit `AppDelegate`/`SceneDelegate` + view-controller callbacks | scratch app logging lifecycles | ~1.75 h · +0.5 h |
| 5 | 05 | **Anatomy of a KMP project** | `shared` module, source sets (`commonMain`/`androidMain`/`iosMain`), `expect`/`actual`, the iOS framework, calling Kotlin from Swift, Gradle multiplatform basics | **m00** skeleton: both apps show a greeting from shared code | ~2.5 h · +0.25 h |

### Week 2 — Declarative UI, shared ViewModels, app architecture (~10 h)

| Day | # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|---|
| 6 | 06 | **Declarative UI: components, state, layout** | imperative vs declarative (UI as a function of state, single source of truth, recomposition / SwiftUI re-render, where side effects go); text, text field, button, image, progress, status/error; layout; local state. *Track:* Compose (`Column`, `remember`) · XML (`ConstraintLayout`, ViewBinding) · SwiftUI (`VStack`, `@State`) · UIKit (`UIStackView`, Auto Layout) | **m01** Device Monitor screen: filter, scan button, status | ~2 h · +1 h |
| 7 | 07 | **Declarative UI: lists, async, navigation** | lists with stable keys, async updates and the main-thread rule, a second screen. *Track:* `LazyColumn` + Navigation Compose · `RecyclerView` + Fragments/NavGraph · `List` + `NavigationStack` · `UITableView` + `UINavigationController` | **m02** Device Monitor shell: list, async status, second screen | ~2.5 h · +1 h |
| 8 | 08 | **Shared ViewModels** | KMP `ViewModel` + `StateFlow<UiState>`, sealed UI state, one-off events modelled as state (`errorMessage` + `errorShown()`); collecting on Android (`collectAsStateWithLifecycle` / `repeatOnLifecycle`); on iOS a `ViewModelOwner` that clears the store and a **hand-written Flow wrapper** | **m03** shell driven by a shared ViewModel over a fake device source | ~2 h · +0.5 h |
| 9 | 09 | **Kotlin↔Swift with SKIE** | **SKIE** replaces the hand-written wrapper (`AsyncSequence`, exhaustive sealed `switch`; pins Kotlin to 2.4.20); note on Swift export as where interop is heading | **m04** iOS observes the ViewModel through SKIE | ~1.5 h · +0.5 h |
| 10 | 10 | **The hexagon: app core, ports, adapters, DI by hand** | the problem from Lessons 08–09 (the ViewModel builds its own data source); app core, inbound port, outbound port, service, adapter; `DeviceScanning` inbound port + scanning service (name filter, each device once), `BleScanner` outbound port + `SimulatedBleScanner` adapter; why interfaces over `expect`/`actual`; the ViewModel calls only the inbound port; DI by hand (constructor injection, `AppContainer` composition root); a Clean-to-hexagonal sidebar (use case ≈ service method, repository ≈ outbound port, boundary ≈ inbound port); a "how to add" recipe (screen, business rule, platform capability, API request) | **m05** shared code restructured as app core + adapters, wired by hand | ~2 h · +0.25 h |

### Week 3 — Testing, Koin, permissions, BLE connect (~11.5 h)

| Day | # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|---|
| 11 | 11 | **Testing the app core + Koin** | `commonTest` with `kotlin.test`, `runTest` + `setMain` (virtual time), Turbine; testing the scanning service through its inbound port with a controllable `FakeBleScanner`; ViewModel tests with a test implementation of the inbound port; `withHostTest`; mutation checks. **Koin** binds each inbound port to its service and each outbound port to its adapter (`single`/`factoryOf`/`viewModelOf`, `internal` module, `initKoin` → Swift `doInitKoin`); start in `Application` / `App.init` / `AppDelegate`; `koinViewModel()` · `by viewModel()` · iOS Koin-backed factory behind `ViewModelOwner`; a graph test, because Koin fails at run time | **m06** Koin wiring, green tests on JVM + iOS | ~2.5 h · +0.25 h |
| 12 | 12 | **Permissions** | check → request → handle result; granted, denied, permanently denied/restricted; `PermissionAccess` inbound port, `PermissionChecker` outbound port. *Track:* `rememberLauncherForActivityResult` · Fragment Activity Result API · SwiftUI/UIKit triggers over `CBManager.authorization` (+ `AVCaptureDevice` if doing E2) | **m07** BLE permissions, every path shown in the UI | ~2 h · +0.5 h |
| 13 | 13 | **BLE: concepts and scan** | central/peripheral, GATT, service, characteristic, UUID, read/write/notify/indicate, connection state; LightBlue as a virtual peripheral; why BLE needs real devices; real `BleScanner` outbound adapters: Android `BluetoothLeScanner` + `callbackFlow`, iOS Swift `CBCentralManager` (delegate retention); scan timeout | **m08** scan a real peripheral into the list | ~2.5 h · +0.25 h |
| 14 | 14 | **BLE: connect** | `DeviceSession` inbound port + session service, `BleConnection` outbound port; Android `connectGatt`, iOS `connect(_:)`; connection-state stream, failure reporting; the "connection reference lost on rotation / view teardown" trap | **m09** connect, live connection state | ~2 h · +0.25 h |
| 15 | 15 | **BLE: discovery and read** | two nested async discoveries (services → characteristics), checking characteristic properties, read; **byte decoding in the app core**, with tests; the iOS `CBPeripheralDelegate` trap | **m10** list services/characteristics, read and decode a value | ~2.5 h |

### Week 4 — Complete BLE, background monitoring, finish (~11 h)

| Day | # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|---|
| 16 | 16 | **BLE: notify, disconnect, errors** | subscribe/unsubscribe, notifications → `Flow` → session service → ViewModel → UI; manual vs unexpected disconnect, cleanup, a consistent connection-state machine in the session service, tested with a fake `BleConnection` | **m11** full BLE flow, with recovery from an unexpected disconnect | ~2.5 h · +0.5 h |
| 17 | 17 | **Device status and the log store** | `StatusReport` inbound port; `BatteryProvider`, `NetworkProvider`, `BluetoothProvider` outbound ports; a `LogStore` outbound port with a JSONL file adapter (append / read / clear / file errors). The log store's iOS adapter is the course's **`iosMain` Kotlin/Native example** (`NSFileManager` from Kotlin) | **m12** live status reported; log lines written and read back | ~2.5 h |
| 18 | 18 | **Background monitor: build it** | `DeviceMonitoring` inbound port (start(interval) / stop / status / logs / clear) + monitoring service; `MonitorScheduler` outbound port with Android WorkManager / foreground service and iOS `BGTaskScheduler` adapters; hooking app-level (not view-level) lifecycle; no bypassing OS limits | **m13** monitor logs status on an interval | ~2 h · +0.25 h |
| 19 | 19 | **Background monitor: platform behaviour table** | run and record the monitor in foreground / background / return / OS kill / force-kill on both platforms; why iOS gives no fixed-interval guarantee; document what each platform allows | **m14** behaviour table written from observed runs | ~1.5 h · +0.25 h |
| 20 | 20 | **Integration and end-to-end check** | one screen operates every feature; run the end-to-end and refactor checklists (Appendix B); fix the findings | **m15** finished core Native Device Monitor | ~2.5 h · +0.5 h |

## Extensions (optional, each starts from m15)

| # | Extension | Covers | Milestone | Est. |
|---|---|---|---|---|
| E1 | **API client with Ktor** | an outbound port named for what the app needs, with a shared Ktor adapter in `commonMain`: per-platform engines, kotlinx.serialization JSON, GET/POST, headers, params, status handling, timeouts, network errors; adapter tests with `MockEngine`, service tests with a fake port; an API test screen | **e1** API screen: success / error / timeout | ~3 h · +0.5 h |
| E2 | **Camera and media** | `MediaCapture` inbound port, `MediaPicker` outbound port; camera permission, capture, pick from the library, media info, display. *Track:* `ActivityResultContracts.TakePicture`/`PickVisualMedia` (Compose / Fragment) · SwiftUI `PhotosPicker` + camera via `UIViewControllerRepresentable` · UIKit `PHPickerViewController` + `UIImagePickerController` | **e2** capture + pick + display | ~3 h · +1 h |
| E3 | **Kable: the library alternative** | Kable adapters behind the same `BleScanner` / `BleConnection` outbound ports, swapped in with one Koin line; compare lines of code, connection-state handling, errors and iOS behaviour against the hand-written adapters; when to choose which | **e3** BLE stack switchable between hand-written and Kable | ~2 h |

Extensions follow the same lesson rules as the core lessons; one that runs over about 2.5 h is split into two lessons when it's written.

## Totals

| | Default track (Compose + SwiftUI) | + one extra UI track | + both extra tracks |
|---|---|---|---|
| Lesson 00 | ~10–15 min | — | — |
| Core lessons (01–20) | **~42.5 h · 4 weeks of 5 days** | ~49 h | ~56 h |
| All extensions | +8 h | +9.5 h | +11 h |

At one lesson per working day (at most about 2.5 h): the core lessons take four 5-day weeks. Extensions fit on weekends or in a fifth week. Each extra UI track adds about 0–1 h per day; days 6–7 (declarative UI) carry the most.

### If time runs short
Within the core lessons, trim in this order:
1. The testing sections inside Lessons 12–17 (keep Lesson 11, which teaches testing).
2. The log store half of Lesson 17 (the monitor then keeps its records in memory).

Apart from those two cuts, never skip a core lesson or part of one: the status report in Lesson 17 and both background-monitor lessons (18–19) stay. Extensions are optional by design.

---

## Lesson anatomy (every lesson page)

1. **Header:** number, title, estimate (`~X h · +Y h per extra UI track`, at most about 2.5 h on the default track), the milestone it produces, prerequisites, track switcher if the lesson touches UI. A lesson that would run longer is split into two lessons, each with its own checks, exercise and brief.
2. **Why this matters:** one paragraph tying it to the app and the team's code.
3. **Concepts:** shared across tracks, each key concept with at least one diagram.
4. **Code walkthroughs:** per track, made of **excerpts**: only the lines a section discusses, at most about 25 lines, under a file-path label coloured by the part of the app the file belongs to, with left-out lines marked and the discussed lines highlighted. "Both" adds a "what changed and why" note.
5. **Gotchas:** real traps, e.g. a GATT reference dropped on rotation, view-disappear callbacks not firing on backgrounding, a widget placed in the wrong layout file displacing the nav host, the BLE delegate being released.
6. **Retrieval checks:** short questions answered from memory (quiz widget).
7. **Unaided exercise:** a small change made without an agent.
8. **Agent brief:** copy-paste block, starting from the previous milestone, with the behaviour per track, files touched and acceptance checks.
9. **Further reading:** links into `RESOURCES.md`.
10. **Full files:** the complete source of every file the lesson touches, collapsed by default. Full files plus the agent brief are enough to build the milestone.

**Diagrams and colour.** Diagrams are colour inline SVG that reads in light and dark mode, never ASCII art. No stretch longer than about one screen is only text. One **colour code** runs through the whole course, in diagrams and excerpt path labels alike: **app core**, **inbound** (ports and adapters), **outbound** (ports and adapters), **Android**, **iOS**. It's defined once, as tokens in the shared stylesheet. Screenshots appear only where they help; there are no decorative images.

**Lesson 00** has its own short shape: what you'll build (with a teaser diagram of the hexagon), how the course works, and the lesson map. No checks, exercise, brief or full files.

---

## Appendix A — Native Device Monitor: feature requirements

Carried over from the team's original learning plan, restated for the hexagonal architecture. Port and method names are the course's suggestion; the behaviour is the requirement. For each feature, the **inbound port** is what the shared ViewModels call, the **service** implementing it holds the rules, and the **outbound ports** are what the service needs from the platform.

| Inbound port (what the app offers) | Outbound ports (what the app needs) | Lessons |
|---|---|---|
| `DeviceScanning` | `BleScanner` | 10, 13 |
| `DeviceSession` | `BleConnection` | 14–16 |
| `PermissionAccess` | `PermissionChecker` | 12 |
| `StatusReport` | `BatteryProvider`, `NetworkProvider`, `BluetoothProvider` | 17 |
| `DeviceMonitoring` | `MonitorScheduler`, `LogStore` (+ the three status ports) | 17–19 |

### A.1 UI (Lessons 06–08, 20)
Keep the UI simple, and enough to operate and test every feature. It must use: a text label, a text field, a button, a list, an image, basic navigation between screens/sections, a loading indicator, and a status/error message. Out of scope: advanced design, animations, complex layouts, design systems.

```
Native Device Monitor
Device name filter: [__________]
[ Scan Bluetooth ]
Discovered devices:  Device A · Device B · Device C
[ Connect ]   Status: Connected
Received data:  01 02 03 04
[ Disconnect ]
```

### A.2 Permissions (Lesson 12)
Check status; request; handle granted, denied, and permanently denied/restricted. Cover the Bluetooth permissions (camera/media ones in E2). The UI asks the ViewModel, the ViewModel asks the inbound port, and only the outbound adapter talks to the OS.
- **Inbound port `PermissionAccess`:** `status(permission)`, `request(permissions)` → a per-permission result.
- **Outbound port `PermissionChecker`:** `check(permission)`, `request(permissions)`; one adapter per platform.

### A.3 BLE (Lessons 13–16, E3)
Flow: scan → select → connect → discover services → discover characteristics → subscribe → receive → read → disconnect.
- **Scan.** Check availability, enabled state and permissions; start; stream discovered devices into a list; stop (manually and on timeout); handle scan errors.
  - Inbound port `DeviceScanning`: `scan(nameFilter): Flow<List<Device>>`, `stopScan()`. The scanning service owns the scan rule: filter by name, report each device once.
  - Outbound port `BleScanner`: `isAvailable()`, `isEnabled()`, `startScan(): Flow<Device>`, `stopScan()`.
- **Connect.** Connect to the selected device; report connection state; handle failure and unexpected disconnection.
  - Inbound port `DeviceSession`: `connect(device)`, `disconnect()`, `connectionState: StateFlow<ConnectionState>`. The session service owns the connection-state machine.
  - Outbound port `BleConnection`: `connect(device)`, `disconnect()`, `connectionState: Flow<ConnectionState>`.
- **Discovery.** Discover services and characteristics; identify readable and notify-capable characteristics. Understand service, characteristic, UUID, read, write, notify/indicate. `DeviceSession.services()` over `BleConnection.discoverServices()`.
- **Notify.** `subscribe(characteristic): Flow<ByteArray>`, `unsubscribe(characteristic)` on both `DeviceSession` and `BleConnection`. Data flows device → outbound adapter → session service → ViewModel → UI.
- **Read.** `read(characteristic): ByteArray` on `BleConnection`; `DeviceSession.read(characteristic)` returns the decoded value. Handle bytes, decode them in the app core, deal with async results and read errors.
- **Disconnect.** Manual disconnect; detect unexpected disconnect; update UI state; clean up subscriptions and resources.
- Out of scope: complex protocols, production device protocols, OTA updates, complex GATT abstraction, advanced pairing/security, Bluetooth Classic.

### A.4 Camera and media (Extension E2)
Request camera permission, open the native camera, capture an image, pick from the media library, return media info, display the image.
- **Inbound port `MediaCapture`:** `capturePhoto()`, `pickMedia()`, returning a `MediaInfo`.
- **Outbound port `MediaPicker`:** the same two calls, one adapter per platform.

Out of scope: image processing, video editing, compression, advanced media management.

### A.5 API client (Extension E1)
GET, POST, headers, parameters, JSON request/response, HTTP status handling, network errors, timeouts, async. API test screen: a URL field, GET/POST buttons, and the response or error shown. Out of scope: auth, token refresh, retry frameworks, caching, pagination.
- **`ApiClient` is not a port.** The app core gets outbound ports named for what it needs: for the test screen, `EndpointProbe` (`get(url, params, headers)`, `post(url, body, headers)` → a `ProbeResult` of status, body or error); a real feature would name its own, for example `LogUploader`.
- **Inbound port `ApiTesting`:** what the test screen's ViewModel calls; its service turns timeouts and network errors into results the UI can show.
- **Outbound adapter:** the Ktor client lives inside one shared adapter in `commonMain`, with per-platform engines. Nothing outside that adapter imports Ktor.

### A.6 Device status and logging (Lesson 17)
- **Inbound port `StatusReport`:** `current(): DeviceStatus`, built from three outbound ports:
  - `BatteryProvider`: battery level.
  - `NetworkProvider`: Wi-Fi enabled/connected, cellular available.
  - `BluetoothProvider`: Bluetooth enabled, connected.
- **Outbound port `LogStore`:** `append(record)`, `read()`, `clear()`, with file errors reported. Its adapters write **JSONL**; the iOS one is the course's `iosMain` Kotlin/Native example.

### A.7 Background monitor (Lessons 18–19)
- **Inbound port `DeviceMonitoring`** (what the app offers): `start(interval)`, `stop()`, `status`, `logs()`, `clearLogs()`. Each tick, the monitoring service collects status → builds a record → saves it to the `LogStore` → repeats; it stops cleanly.
- **Outbound port `MonitorScheduler`** (what the app needs): `schedule(interval, tick)`, `cancel()`. Adapters: WorkManager / foreground service on Android, `BGTaskScheduler` on iOS.

Example record:
```json
{"timestamp":"2026-09-11T10:30:00","battery":82,"wifiEnabled":true,"wifiConnected":true,"cellularAvailable":true,"bluetoothEnabled":true,"bluetoothConnected":false}
```
Demonstrate and document the behaviour in foreground, in background, on return to foreground, after OS termination, and after force-kill. Use the platform-supported mechanism; never bypass OS limits. Where continuous execution after force-kill isn't supported, document that (iOS gives no fixed-interval guarantee).

## Appendix B — Checklists (Lesson 20)

**End-to-end**
- Permission: check · request · deny · retry.
- BLE: scan · connect · discover · subscribe · receive notification · read · disconnect · reconnect · unexpected disconnect.
- Camera (if E2 done): request permission · capture · select · display.
- API (if E1 done): GET · POST · success · error · timeout.
- Background monitor: start · background · return · stop · restart · OS termination · force-kill.

**Refactor**
- The UI contains no device logic; it renders state and forwards events to its ViewModel.
- ViewModels call only inbound ports: no platform APIs, no outbound ports, no adapters.
- The app core imports nothing from Android, iOS, Ktor, Koin or any other framework.
- Each inbound port is one capability; each outbound port has one clear responsibility and is named in the app's terms.
- Every rule of the app lives in a service, not in a ViewModel or an adapter; no feature logic is duplicated across platforms.
- Koin binds each inbound port to its service and each outbound port to its adapter; swapping an adapter is one line, and the graph test is green.
- Async work is scoped and cancelled correctly; errors reach the UI as state.
- Resources are released (GATT closed, subscriptions cancelled, monitor stoppable).
- BLE connection state is consistent across the outbound adapter, the session service, the ViewModel and the UI.
- Service tests drive each service through its inbound port with fakes behind its outbound ports, and are green on JVM and iOS.
- No unused dependencies.
