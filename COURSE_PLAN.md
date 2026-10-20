# Native Mobile Course — Compose · SwiftUI · Kotlin Multiplatform

The curriculum for building one app, the **Native Device Monitor**, on Android and iOS, on top of a shared Kotlin Multiplatform core. A 3-week core plus optional extensions. Work through the core in order. Each lesson teaches one step and adds one **milestone** to your app.

## How this course works

- **Who it's for:** developers who already know a typed language, most likely TypeScript from Ionic/Angular work. Lesson 01 maps what you know onto Kotlin and Swift instead of teaching programming from scratch.
- **A 3-week core plus optional extensions.** The core (Lessons 01–13) builds the full app: KMP, declarative UI, architecture, permissions, the complete BLE flow, and background monitoring. The extensions (E1–E3) add a network client, camera/media and a BLE library comparison. Pick the ones your work needs.
- **One app, growing.** From Lesson 03 on, every lesson adds one milestone to the same project. Each lesson's agent brief starts from the previous milestone. Extensions all start from the finished core (m10).
- **Choose your UI track.** Every UI-touching lesson has a switcher: Android `XML | Compose | Both`, iOS `UIKit | SwiftUI | Both`. **Compose + SwiftUI is the default** and the team's target. XML Views and UIKit are there because the team's app still contains that code. "Both" shows the tracks side by side, with a "what changed and why" note. The concept sections are shared by all tracks.
- **The core is always KMP.** Shared Kotlin holds the domain, the data layer and the ViewModels. Platform adapters (BLE radio, permissions, camera, background scheduling) sit behind **ports** (Kotlin interfaces). Android adapters are Kotlin in `androidMain`. iOS adapters are **Swift** implementing the Kotlin port.
- **Code authorship.** You may let an AI agent write the code, but never blind:
  1. Read the lesson's line-by-line walkthrough, or have your agent give you one for its code.
  2. Answer the retrieval checks.
  3. Do the **unaided exercise** yourself. This step is not optional.
- **Agent brief.** Every lesson ends with a copy-paste brief: the starting milestone, the behaviour to build for your track, the files involved, and acceptance checks. Hand it to your agent, or follow it yourself.
- **Estimates, not dates.** Each lesson header reads like `~3 h · +1 h per extra UI track`. Week totals assume the default track at 2.5–3 h/day. A lesson longer than one sitting is split into **Part A / Part B**, each ending at a natural stop (a passing build or a finished exercise).

## Environment

- macOS with the latest stable Xcode and Android Studio (with the Kotlin Multiplatform plugin), and JDK 17+.
- **A physical Android phone and a physical iPhone** for everything BLE (from Lesson 08). The iOS Simulator reports Bluetooth as `.unsupported`, and the Android emulator has no Bluetooth radio. UI-only lessons run fine on simulator/emulator.
- **BLE test peripheral:** the LightBlue app on a Mac, set up as a virtual peripheral with one readable and one notifying characteristic. Set up in Lesson 08.
- Minimum OS versions: Android minSdk 26; iOS 17 (needed for SwiftUI `@Observable`; the UIKit track uses the same target).
- Library versions are pinned in the lesson that introduces each library, not here.

## Architecture you'll end up with

```
 Compose UI │ XML Views UI          SwiftUI │ UIKit UI        ← thin: render state, forward events
        └──────────┬───────────────────┬─────────┘
                   ▼                   ▼
      shared ViewModels  (commonMain, StateFlow<UiState>)    ← Swift sees Flows via SKIE
                   │
      domain  (commonMain): models · use cases · repository interfaces
                   │
      data    (commonMain): repositories · FileLogger · ports  (+ Ktor ApiClient in E1)
                   │                                   │
      androidMain adapters (Kotlin)        iOS adapters (Swift, implement Kotlin ports)
      BluetoothGatt · ActivityResult ·     CoreBluetooth · AVFoundation ·
      WorkManager                          BGTaskScheduler
                   └──────────── wired with Koin ─────────────┘
```

Important rule: **UI ≠ device logic.** The UI receives input, calls the ViewModel, and renders state. Everything else sits below it.

---

## Core lessons

Milestone tags (`m00`…`m10`) mark each lesson's finished demo state.

### Week 1 — Languages, platforms, KMP, declarative UI (~14.5 h)

| # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|
| 01 | **Kotlin + Swift for TypeScript developers** | *A — Kotlin:* val/var, functions, classes/interfaces/data classes, null safety, collections and lambdas, extension functions, coroutines and `Flow` (`suspend`, scopes, `StateFlow`). *B — Swift:* let/var, struct vs class, protocols, optionals, closures, async/await, `AsyncSequence`, `@MainActor`. Each idea mapped from its TypeScript equivalent, with time spent on what has no TS counterpart | scratch exercises | ~4 h |
| 02 | **Platform fundamentals** | *A — Android:* project structure, Activity, Context, Intent, Manifest, lifecycle (Home vs rotation), Gradle; Java reading via a cheatsheet. *B — iOS:* Xcode project, Info.plist, frameworks, **two lifecycles** (app/scene vs view). *Track:* SwiftUI `App` + `scenePhase` · UIKit `AppDelegate`/`SceneDelegate` + view-controller callbacks | scratch apps logging lifecycles | ~3.5 h · +0.5 h |
| 03 | **Anatomy of a KMP project** | `shared` module, source sets (`commonMain`/`androidMain`/`iosMain`), `expect`/`actual`, the iOS framework, calling Kotlin from Swift, Gradle multiplatform basics | **m00** skeleton: both apps show a greeting from shared code | ~2.5 h · +0.25 h |
| 04 | **Declarative UI: components, lists, navigation** | *A:* imperative vs declarative (UI as a function of state, single source of truth, recomposition / SwiftUI re-render, where side effects go); text, text field, button, image, progress, status/error; layout; local state. *B:* lists with stable keys, async updates and the main-thread rule, a second screen. *Track:* Compose (`Column`, `remember`, `LazyColumn`, Navigation Compose) · XML (`ConstraintLayout`, ViewBinding, `RecyclerView`, Fragments/NavGraph) · SwiftUI (`VStack`, `@State`, `List`, `NavigationStack`) · UIKit (`UIStackView`, Auto Layout, `UITableView`, `UINavigationController`) | **m01** Device Monitor shell: list, async status, second screen | ~4.5 h · +2 h |

### Week 2 — Architecture, permissions, BLE connect (~13.5 h)

| # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|
| 05 | **Shared ViewModels and Kotlin↔Swift** | KMP `ViewModel` + `StateFlow<UiState>`, sealed UI state, one-off events; collecting on Android (`collectAsStateWithLifecycle` / `repeatOnLifecycle`); on iOS a **hand-written Flow wrapper** first, then **SKIE** (`AsyncSequence`, exhaustive sealed `switch`); note on Swift export as where interop is heading | **m02** shell driven by a shared ViewModel over a fake device source | ~3.5 h · +1 h |
| 06 | **Clean architecture, DI, and testing the core** | domain / data / presentation layers, ports and adapters, use cases; DI by hand (constructor injection) first, then **Koin**; `commonTest` with `kotlin.test`, `runTest`, Turbine, fake ports | **m03** layered core, Koin wiring, first green tests | ~3.5 h |
| 07 | **Permissions** | check → request → handle result; granted, denied, permanently denied/restricted; a `PermissionChecker` port. *Track:* `rememberLauncherForActivityResult` · Fragment Activity Result API · SwiftUI/UIKit triggers over `CBManager.authorization` (+ `AVCaptureDevice` if doing E2) | **m04** BLE permissions, every path shown in the UI | ~2 h · +0.5 h |
| 08 | **BLE: concepts, scan, connect** | *A:* central/peripheral, GATT, service, characteristic, UUID, read/write/notify/indicate, connection state; LightBlue as a virtual peripheral; why BLE needs real devices; the `BleScanner` port. *B:* Android adapter (`BluetoothLeScanner`, `connectGatt`, `callbackFlow`); iOS adapter in Swift (`CBCentralManager`, delegate retention); scan timeout, connection-state stream, failure reporting; the "connection reference lost on rotation / view teardown" trap | **m05** scan, list, connect, live connection state | ~4.5 h · +0.5 h |

### Week 3 — Complete BLE, background monitoring, finish (~14 h)

| # | Lesson | Covers | Milestone | Est. |
|---|---|---|---|---|
| 09 | **BLE discovery + read** | two nested async discoveries (services → characteristics), checking characteristic properties, read; **byte decoding in `commonMain`**, with tests; the iOS `CBPeripheralDelegate` trap | **m06** list services/characteristics, read and decode a value | ~2.5 h |
| 10 | **BLE notify, disconnect, and errors** | subscribe/unsubscribe, notifications → `Flow` → ViewModel → UI; manual vs unexpected disconnect, cleanup, a consistent connection-state machine, tested with a fake port | **m07** full BLE flow, with recovery from an unexpected disconnect | ~3 h · +0.5 h |
| 11 | **Device providers + FileLogger** | `BatteryProvider`, `NetworkProvider`, `BluetoothProvider` ports; a JSONL `FileLogger` (append / read / clear / file errors). The FileLogger's iOS side is the course's **`iosMain` Kotlin/Native example** (`NSFileManager` from Kotlin) | **m08** providers report live status; log lines written and read back | ~2.5 h |
| 12 | **Background monitor** | `BackgroundMonitor` (start(interval) / stop / status / logs / clear); Android WorkManager / foreground service vs iOS `BGTaskScheduler`; hooking app-level (not view-level) lifecycle; behaviour table for foreground / background / return / OS kill / force-kill; no bypassing OS limits | **m09** monitor logs status on an interval; behaviour table written | ~3.5 h · +0.5 h |
| 13 | **Integration, end-to-end test, cleanup** | one screen operates every feature; run the end-to-end and refactor checklists (Appendix B); fix the findings | **m10** finished core Native Device Monitor | ~2.5 h · +0.5 h |

## Extensions (optional, each starts from m10)

| # | Extension | Covers | Milestone | Est. |
|---|---|---|---|---|
| E1 | **API client with Ktor** | Ktor client in `commonMain`, per-platform engines, kotlinx.serialization JSON, GET/POST, headers, params, status handling, timeouts, network errors; tests with `MockEngine`; an API test screen | **e1** API screen: success / error / timeout | ~3 h · +0.5 h |
| E2 | **Camera and media** | `MediaPicker` port; camera permission, capture, pick from the library, media info, display. *Track:* `ActivityResultContracts.TakePicture`/`PickVisualMedia` (Compose / Fragment) · SwiftUI `PhotosPicker` + camera via `UIViewControllerRepresentable` · UIKit `PHPickerViewController` + `UIImagePickerController` | **e2** capture + pick + display | ~3 h · +1 h |
| E3 | **Kable: the library alternative** | a `KableBleScanner` behind the same `BleScanner` port, swapped in with one Koin line; compare lines of code, connection-state handling, errors and iOS behaviour against the hand-written adapters; when to choose which | **e3** BLE stack switchable between hand-written and Kable | ~2 h |

## Totals

| | Default track (Compose + SwiftUI) | + one extra UI track | + both extra tracks |
|---|---|---|---|
| Core (01–13) | **~42 h · ~3 weeks** | ~48 h | ~54 h |
| All extensions | +8 h | +9.5 h | +11 h |

At 2.5–3 h/day (~14 h/week): core alone ≈ 3 weeks; core + all extensions ≈ 3.5 weeks.

### If time runs short
Within the core, trim in this order: the testing sections inside lessons, then the FileLogger half of Lesson 11 (the background monitor then keeps its records in memory). Never trim Lessons 01–10, the providers, or Lesson 12. Extensions are optional by design.

---

## Lesson anatomy (every lesson page)

1. **Header:** number, title, estimate (`~X h · +Y h per extra UI track`), the milestone it produces, prerequisites. Stack switcher if the lesson touches UI. Part A / Part B markers if longer than one sitting.
2. **Why this matters:** one paragraph tying it to the app and the team's code.
3. **Concepts:** shared across tracks.
4. **Code walkthroughs:** per track, full code with line-by-line explanation. "Both" adds a "what changed and why" note.
5. **Gotchas:** real traps, e.g. a GATT reference dropped on rotation, view-disappear callbacks not firing on backgrounding, a widget placed in the wrong layout file displacing the nav host, the BLE delegate being released.
6. **Retrieval checks:** short questions answered from memory (quiz widget).
7. **Unaided exercise:** a small change made without an agent.
8. **Agent brief:** copy-paste block, starting from the previous milestone, with the behaviour per track, files touched and acceptance checks.
9. **Further reading:** links into `RESOURCES.md`.

---

## Appendix A — Native Device Monitor: feature requirements

Carried over from the team's original learning plan, restated for the KMP architecture. Port and method names are the course's suggestion; the behaviour is the requirement.

### A.1 UI (Lessons 04, 05, 13)
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

### A.2 Permissions (Lesson 07): `PermissionChecker` port
Check status; request; handle granted, denied, and permanently denied/restricted. Cover the Bluetooth permissions (camera/media ones in E2). The UI asks the ViewModel, never the OS directly.
`check(permission)`, `request(permissions)` → a per-permission result.

### A.3 BLE (Lessons 08–10, E3): `BleScanner` / connection ports + `DeviceRepository`
Flow: scan → select → connect → discover services → discover characteristics → subscribe → receive → read → disconnect.
- **Scan:** check availability, enabled state and permissions; start; stream discovered devices into a list; stop (manually and on timeout); handle scan errors. `isAvailable()`, `isEnabled()`, `startScan(): Flow<Device>`, `stopScan()`.
- **Connect:** connect to the selected device; report connection state; handle failure and unexpected disconnection. `connect(device)`, `disconnect()`, `connectionState: StateFlow<ConnectionState>`.
- **Discovery:** discover services and characteristics; identify readable and notify-capable characteristics. Understand service, characteristic, UUID, read, write, notify/indicate.
- **Notify:** `subscribe(characteristic): Flow<ByteArray>`, `unsubscribe(characteristic)`. Data flows device → adapter → repository → ViewModel → UI.
- **Read:** `read(characteristic): ByteArray`. Handle bytes, decode them into a useful representation, deal with async results and read errors.
- **Disconnect:** manual disconnect; detect unexpected disconnect; update UI state; clean up subscriptions and resources.
- Out of scope: complex protocols, production device protocols, OTA updates, complex GATT abstraction, advanced pairing/security, Bluetooth Classic.

### A.4 Camera and media (Extension E2): `MediaPicker` port
Request camera permission, open the native camera, capture an image, pick from the media library, return media info, display the image. `capturePhoto()`, `pickMedia()`, returning a `MediaInfo`. Out of scope: image processing, video editing, compression, advanced media management.

### A.5 API client (Extension E1): `ApiClient` (commonMain, Ktor)
GET, POST, headers, parameters, JSON request/response, HTTP status handling, network errors, timeouts, async. `get(url, params, headers)`, `post(url, body, headers)`. API test screen: a URL field, GET/POST buttons, and the response or error shown. Out of scope: auth, token refresh, retry frameworks, caching, pagination.

### A.6 Device providers and logging (Lesson 11)
`BatteryProvider`, `NetworkProvider` (Wi-Fi enabled/connected, cellular available), `BluetoothProvider` (enabled, connected). `FileLogger` writing **JSONL**: append, read, clear, and handle file errors.

### A.7 Background monitor (Lesson 12): `BackgroundMonitor`
`start(interval)`, `stop()`, `status`, `logs()`, `clearLogs()`. Each tick: collect status → build a record → save → repeat; stop cleanly. Example record:
```json
{"timestamp":"2026-09-11T10:30:00","battery":82,"wifiEnabled":true,"wifiConnected":true,"cellularAvailable":true,"bluetoothEnabled":true,"bluetoothConnected":false}
```
Demonstrate and document the behaviour in foreground, in background, on return to foreground, after OS termination, and after force-kill. Use the platform-supported mechanism; never bypass OS limits. Where continuous execution after force-kill isn't supported, document that (iOS gives no fixed-interval guarantee).

## Appendix B — Checklists (Lesson 13)

**End-to-end**
- Permission: check · request · deny · retry.
- BLE: scan · connect · discover · subscribe · receive notification · read · disconnect · reconnect · unexpected disconnect.
- Camera (if E2 done): request permission · capture · select · display.
- API (if E1 done): GET · POST · success · error · timeout.
- Background monitor: start · background · return · stop · restart · OS termination · force-kill.

**Refactor**
- The UI contains no device logic; ViewModels contain no platform APIs.
- Every port has one clear responsibility; adapters are swappable through DI.
- Async work is scoped and cancelled correctly; errors reach the UI as state.
- Resources are released (GATT closed, subscriptions cancelled, monitor stoppable).
- BLE connection state is consistent across UI, ViewModel and adapter.
- Shared-code tests are green.
- No unused dependencies and no duplicated feature logic across platforms.
