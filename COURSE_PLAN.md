# Native Mobile Course — Compose · SwiftUI · Kotlin Multiplatform

The curriculum for building one app, the **Native Device Monitor**, on Android and iOS, on top of a shared Kotlin Multiplatform core. Work through it in order. Each lesson teaches one step and adds one **milestone** to your app.

## How this course works

- **One app, growing.** From Lesson 05 on, every lesson adds one milestone to the same project. Each lesson's agent brief starts from the previous milestone.
- **Choose your UI track.** Every UI-touching lesson has a switcher: Android `XML | Compose | Both`, iOS `UIKit | SwiftUI | Both`. **Compose + SwiftUI is the default** and the team's target. XML Views and UIKit are there because the team's app still contains that code. "Both" shows the tracks side by side, with a "what changed and why" note. The concept sections are shared by all tracks.
- **The core is always KMP.** Shared Kotlin holds the domain, the data layer and the ViewModels. Platform adapters (BLE radio, permissions, camera, background scheduling) sit behind **ports** (Kotlin interfaces). Android adapters are Kotlin in `androidMain`. iOS adapters are **Swift** implementing the Kotlin port.
- **Code authorship.** You may let an AI agent write the code, but never blind:
  1. Read the lesson's line-by-line walkthrough, or have your agent give you one for its code.
  2. Answer the retrieval checks.
  3. Do the **unaided exercise** yourself. This step is not optional.
- **Agent brief.** Every lesson ends with a copy-paste brief: the starting milestone, the behaviour to build for your track, the files involved, and acceptance checks. Hand it to your agent, or follow it yourself.
- **Estimates, not dates.** Each lesson header reads like `~3 h · +1.5 h per extra UI track`. Week totals below assume the default track at 2.5–3 h/day.

## Environment

- macOS with the latest stable Xcode and Android Studio (with the Kotlin Multiplatform plugin), and JDK 17+.
- **A physical Android phone and a physical iPhone** for everything BLE (from Lesson 13). The iOS Simulator reports Bluetooth as `.unsupported`, and the Android emulator has no Bluetooth radio. UI-only lessons run fine on simulator/emulator.
- **BLE test peripheral:** the LightBlue app on a Mac, set up as a virtual peripheral with one readable and one notifying characteristic. Set up in Lesson 12.
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
      data    (commonMain): repositories · ApiClient (Ktor) · FileLogger · ports
                   │                                   │
      androidMain adapters (Kotlin)        iOS adapters (Swift, implement Kotlin ports)
      BluetoothGatt · ActivityResult ·     CoreBluetooth · AVFoundation/PhotosUI ·
      CameraX/Intents · WorkManager        BGTaskScheduler
                   └──────────── wired with Koin ─────────────┘
```

Important rule: **UI ≠ device logic.** The UI receives input, calls the ViewModel, and renders state. Everything else sits below it.

---

## Lessons

`P0` = must complete · `P1` = should complete · `P2` = can simplify. Milestone tags (`m00`…) mark each lesson's finished demo state.

### Week 1 — Languages, platforms, and the KMP project (~15 h)

| # | Lesson | Covers | Milestone | Est. | P |
|---|---|---|---|---|---|
| 01 | **Kotlin fundamentals** | val/var, functions, classes/interfaces/data classes, null safety, collections + lambdas, extension functions; coroutines and `Flow` basics (`suspend`, scopes, `StateFlow`) | scratch exercises | ~3.5 h | P0 |
| 02 | **Swift fundamentals** | let/var, functions, struct vs class, protocols, optionals, closures; async/await, `AsyncSequence`, `@MainActor` | scratch exercises | ~3 h | P0 |
| 03 | **Android fundamentals + Java reading** | project structure, Activity, Context, Intent, Manifest, lifecycle (Home vs rotation), Gradle; reading Java (class, interface, override, generic, callback) | scratch app logging lifecycle | ~3 h | P0 |
| 04 | **iOS fundamentals** | Xcode project structure, Info.plist, frameworks; **two lifecycles**: app/scene vs view. *Track:* SwiftUI `App` + `scenePhase` · UIKit `AppDelegate`/`SceneDelegate` + view-controller callbacks | scratch app logging lifecycle | ~2.5 h · +1 h | P0 |
| 05 | **Anatomy of a KMP project** | `shared` module, source sets (`commonMain`/`androidMain`/`iosMain`), `expect`/`actual`, the iOS framework, calling Kotlin from Swift, Gradle multiplatform basics | **m00** skeleton: both apps show a greeting from shared code | ~3 h | P0 |

### Week 2 — Declarative UI and architecture (~16 h)

| # | Lesson | Covers | Milestone | Est. | P |
|---|---|---|---|---|---|
| 06 | **Imperative vs declarative UI** | UI as a function of state, single source of truth, recomposition / SwiftUI re-render, where side effects go, how UI lifecycle differs from app lifecycle. Read-along comparison of all four stacks | none (concept lesson) | ~1.5 h | P0 |
| 07 | **Native UI I: components and layout** | text, text field, button, image, progress indicator, status/error message; basic layout; local UI state. *Track:* Compose `Column`/`remember` · XML `ConstraintLayout`/ViewBinding · SwiftUI `VStack`/`@State` · UIKit `UIStackView`/Auto Layout | **m01** Device Monitor shell screen | ~3 h · +1.5 h | P0 |
| 08 | **Native UI II: lists, async updates, navigation** | lists with stable keys, updating UI from async work, the main-thread rule, a second screen. *Track:* `LazyColumn` + Navigation Compose · `RecyclerView` adapter + Fragments/NavGraph · `List` + `NavigationStack` · `UITableView` + `UINavigationController` | **m02** list + async status + second screen | ~3 h · +1.5 h | P0 |
| 09 | **Shared ViewModels and Kotlin↔Swift** | KMP `ViewModel` + `StateFlow<UiState>`, sealed UI state, one-off events; collecting on Android (`collectAsStateWithLifecycle` / `repeatOnLifecycle`); on iOS, a **hand-written Flow wrapper** first, then **SKIE** (`AsyncSequence`, exhaustive sealed `switch`); note on Swift export as where interop is heading | **m03** shell driven by a shared ViewModel over a fake device source | ~4 h · +1 h | P0 |
| 10 | **Clean architecture, DI, and testing the core** | domain / data / presentation layers, ports and adapters, use cases; DI by hand (constructor injection) first, then **Koin**; `commonTest` with `kotlin.test`, `runTest`, Turbine, fake ports | **m04** layered core, Koin wiring, first green tests | ~4.5 h | P0 |

### Week 3 — Permissions and the full BLE flow (~15 h)

| # | Lesson | Covers | Milestone | Est. | P |
|---|---|---|---|---|---|
| 11 | **Permissions** | check → request → handle result; granted, denied, permanently denied/restricted; a `PermissionChecker` port. *Track:* `rememberLauncherForActivityResult` · Fragment Activity Result API · SwiftUI/UIKit triggers over `AVCaptureDevice` + `CBManager.authorization` | **m05** BLE + camera permissions, all paths shown in UI | ~2.5 h · +0.5 h | P0 |
| 12 | **BLE concepts + test peripheral** | central/peripheral, GATT, service, characteristic, UUID, read/write/notify/indicate, connection state; set up LightBlue as a virtual peripheral; why BLE needs real devices | none (setup + concept) | ~1.5 h | P0 |
| 13 | **BLE scan + connect** | `BleScanner` port; Android adapter (`BluetoothLeScanner`, `connectGatt`, `callbackFlow`); iOS adapter in Swift (`CBCentralManager`, delegate retention); scan timeout, connection-state stream, failure reporting; the "connection reference lost on rotation / view teardown" trap | **m06** scan, list, connect, live connection state | ~4 h · +0.5 h | P0 |
| 14 | **BLE discovery + read** | two nested async discoveries (services → characteristics), checking characteristic properties, read; **byte decoding in `commonMain`**, with tests; the iOS `CBPeripheralDelegate` trap | **m07** list services/characteristics, read and decode a value | ~3 h · +0.5 h | P0 |
| 15 | **BLE notify, disconnect, and errors** | subscribe/unsubscribe, notifications → `Flow` → ViewModel → UI; manual vs unexpected disconnect, cleanup, a consistent connection state machine; tests for the state machine with a fake port | **m08** full BLE flow, with recovery from an unexpected disconnect | ~4 h · +0.5 h | P0 |

### Week 4 — Swappable BLE, media, network, device data (~11.5 h)

| # | Lesson | Covers | Milestone | Est. | P |
|---|---|---|---|---|---|
| 16 | **Kable: the library alternative** | a `KableBleScanner` behind the same `BleScanner` port, swapped in with one Koin line; compare lines of code, connection-state handling, errors and iOS behaviour against your hand-written adapters; when to choose which | **m09** BLE stack switchable between hand-written and Kable | ~2 h | P1 |
| 17 | **Camera and media** | `MediaPicker` port; capture a photo, pick from the library, return media info, display the image. *Track:* `ActivityResultContracts.TakePicture`/`PickVisualMedia` (Compose / Fragment) · SwiftUI `PhotosPicker` + camera via `UIViewControllerRepresentable` · UIKit `PHPickerViewController` + `UIImagePickerController` | **m10** capture + pick + display | ~3 h · +1 h | P1 |
| 18 | **API client with Ktor** | Ktor client in `commonMain`, per-platform engines, kotlinx.serialization JSON, GET/POST, headers, params, status handling, timeouts, network errors; tests with `MockEngine`; API test screen | **m11** API test screen: success / error / timeout | ~3.5 h · +0.5 h | P1 |
| 19 | **Device providers + FileLogger** | `BatteryProvider`, `NetworkProvider`, `BluetoothProvider` ports; a JSONL `FileLogger` (append / read / clear / file errors). The FileLogger's iOS side is the course's **`iosMain` Kotlin/Native example** (`NSFileManager` from Kotlin) | **m12** providers report live status; log lines written and read back | ~3 h | P0 providers · P1 logger |

### Week 5 — Background monitoring and finishing (~11 h)

| # | Lesson | Covers | Milestone | Est. | P |
|---|---|---|---|---|---|
| 20 | **Background monitor** | `BackgroundMonitor` (start(interval) / stop / status / logs / clear); Android WorkManager / foreground service vs iOS `BGTaskScheduler`; hooking app-level (not view-level) lifecycle; behaviour table for foreground / background / return / OS kill / force-kill; no bypassing OS limits | **m13** monitor logs status on an interval; behaviour table written | ~5 h · +0.5 h | P0 |
| 21 | **Integration, end-to-end test, cleanup** | one screen operates every feature; run the end-to-end checklist and the refactor checklist (Appendix B); fix the findings | **m14** finished Native Device Monitor | ~6 h · +1 h | P0 |

### Totals

| | Default track (Compose + SwiftUI) | + one extra UI track | + both extra tracks ("Both" everywhere) |
|---|---|---|---|
| Hours | **~69 h** | ~79 h | ~89 h |
| Weeks at 2.5–3 h/day | **~5** | ~6 | ~7 |

### If time runs short

Cut in this order: P2 items, then P1 lessons (16 Kable → 17 Camera → 18 API → the logger half of 19), then the testing sections inside lessons. If the FileLogger is cut, the background monitor keeps its records in memory. Never cut: Lessons 01–15, the providers in 19, or 20.

`P2`: advanced API error handling, advanced media handling, complex UI, extra UI tracks beyond the one you chose.

---

## Lesson anatomy (every lesson page)

1. **Header:** number, title, estimate (`~X h · +Y h per extra UI track`), priority, the milestone it produces, prerequisites. Stack switcher if the lesson touches UI.
2. **Why this matters:** one paragraph tying it to the app and the team's code.
3. **Concepts:** shared across tracks.
4. **Code walkthroughs:** per track, full code with line-by-line explanation. "Both" adds a "what changed and why" note.
5. **Gotchas:** real traps, e.g. a GATT reference dropped on rotation, view-disappear callbacks not firing on backgrounding, a widget placed in the wrong layout file displacing the nav host, the BLE delegate being released.
6. **Retrieval checks:** short questions answered from memory (quiz widget).
7. **Unaided exercise:** a small change made without an agent.
8. **Agent brief:** copy-paste block, starting from milestone N-1, with the behaviour per track, files touched and acceptance checks.
9. **Further reading:** links into `RESOURCES.md`.

---

## Appendix A — Native Device Monitor: feature requirements

Carried over from the team's original learning plan, restated for the KMP architecture. Port and method names are the course's suggestion; the behaviour is the requirement.

### A.1 UI (Lessons 07–09, 21)
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

### A.2 Permissions (Lesson 11): `PermissionChecker` port
Check status; request; handle granted, denied, and permanently denied/restricted. Cover the Bluetooth and camera/media permissions. The UI asks the ViewModel, never the OS directly.
`check(permission)`, `request(permissions)` → a per-permission result.

### A.3 BLE (Lessons 12–16): `BleScanner` / connection ports + `DeviceRepository`
Flow: scan → select → connect → discover services → discover characteristics → subscribe → receive → read → disconnect.
- **Scan:** check availability, enabled state and permissions; start; stream discovered devices into a list; stop (manually and on timeout); handle scan errors. `isAvailable()`, `isEnabled()`, `startScan(): Flow<Device>`, `stopScan()`.
- **Connect:** connect to the selected device; report connection state; handle failure and unexpected disconnection. `connect(device)`, `disconnect()`, `connectionState: StateFlow<ConnectionState>`.
- **Discovery:** discover services and characteristics; identify readable and notify-capable characteristics. Understand service, characteristic, UUID, read, write, notify/indicate.
- **Notify:** `subscribe(characteristic): Flow<ByteArray>`, `unsubscribe(characteristic)`. Data flows device → adapter → repository → ViewModel → UI.
- **Read:** `read(characteristic): ByteArray`. Handle bytes, decode them into a useful representation, deal with async results and read errors.
- **Disconnect:** manual disconnect; detect unexpected disconnect; update UI state; clean up subscriptions and resources.
- Out of scope: complex protocols, production device protocols, OTA updates, complex GATT abstraction, advanced pairing/security, Bluetooth Classic.

### A.4 Camera and media (Lesson 17): `MediaPicker` port
Request camera permission, open the native camera, capture an image, pick from the media library, return media info, display the image. `capturePhoto()`, `pickMedia()`, returning a `MediaInfo`. Out of scope: image processing, video editing, compression, advanced media management.

### A.5 API client (Lesson 18): `ApiClient` (commonMain, Ktor)
GET, POST, headers, parameters, JSON request/response, HTTP status handling, network errors, timeouts, async. `get(url, params, headers)`, `post(url, body, headers)`. API test screen: a URL field, GET/POST buttons, and the response or error shown. Out of scope: auth, token refresh, retry frameworks, caching, pagination.

### A.6 Device providers and logging (Lesson 19)
`BatteryProvider`, `NetworkProvider` (Wi-Fi enabled/connected, cellular available), `BluetoothProvider` (enabled, connected). `FileLogger` writing **JSONL**: append, read, clear, and handle file errors.

### A.7 Background monitor (Lesson 20): `BackgroundMonitor`
`start(interval)`, `stop()`, `status`, `logs()`, `clearLogs()`. Each tick: collect status → build a record → save → repeat; stop cleanly. Example record:
```json
{"timestamp":"2026-09-11T10:30:00","battery":82,"wifiEnabled":true,"wifiConnected":true,"cellularAvailable":true,"bluetoothEnabled":true,"bluetoothConnected":false}
```
Demonstrate and document the behaviour in foreground, in background, on return to foreground, after OS termination, and after force-kill. Use the platform-supported mechanism; never bypass OS limits. Where continuous execution after force-kill isn't supported, document that (iOS gives no fixed-interval guarantee).

## Appendix B — Checklists (Lesson 21)

**End-to-end**
- Permission: check · request · deny · retry.
- BLE: scan · connect · discover · subscribe · receive notification · read · disconnect · reconnect · unexpected disconnect.
- Camera: request permission · capture · select · display.
- API: GET · POST · success · error · timeout.
- Background monitor: start · background · return · stop · restart · OS termination · force-kill.

**Refactor**
- The UI contains no device logic; ViewModels contain no platform APIs.
- Every port has one clear responsibility; adapters are swappable through DI.
- Async work is scoped and cancelled correctly; errors reach the UI as state.
- Resources are released (GATT closed, subscriptions cancelled, monitor stoppable).
- BLE connection state is consistent across UI, ViewModel and adapter.
- Shared-code tests are green.
- No unused dependencies and no duplicated feature logic across platforms.
