# Native Mobile Development (Kotlin + Swift) Resources

## Knowledge

- [Kotlin: Basic syntax overview (kotlinlang.org)](https://kotlinlang.org/docs/basic-syntax.html)
  Official language reference. Use for: variables, functions, classes, control flow syntax.
- [Kotlin: Null safety (kotlinlang.org)](https://kotlinlang.org/docs/null-safety.html)
  Official docs on nullable types and safe calls. Use for: Day 1 Kotlin fundamentals.
- [Swift: The Basics (docs.swift.org)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/)
  Official Swift Programming Language book, "The Basics" chapter. Use for: constants/variables, optionals, basic types.
- [Swift: The Swift Programming Language book (docs.swift.org)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
  Full official Swift reference — chapters on Classes and Structures, Protocols, Closures, Concurrency. Use for: Day 2 Swift fundamentals.
- [Android Developers: The activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)
  Official guide to Activity states and lifecycle callbacks. Use for: Day 3 Android fundamentals.
- [Apple Developer: Managing your app's life cycle](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle)
  Official UIKit app-lifecycle documentation. Use for: Day 4 iOS fundamentals.
- [Apple Developer: UIViewController](https://developer.apple.com/documentation/uikit/uiviewcontroller)
  Official view controller reference, incl. view lifecycle methods (viewDidLoad, viewWillAppear, viewDidAppear). Use for: Day 4 iOS fundamentals, Native UI work.
- [Android Developers: Bluetooth Low Energy overview](https://developer.android.com/develop/connectivity/bluetooth/ble/ble-overview)
  Official BLE concepts guide: central vs peripheral, GATT client vs server, services, characteristics, descriptors, UUIDs. Use for: Lesson 13 (primary source for the concepts).
- [Android Developers: Find BLE devices](https://developer.android.com/develop/connectivity/bluetooth/ble/find-ble-devices)
  Official guide to BluetoothLeScanner.startScan()/stopScan() and ScanCallback; `getBluetoothLeScanner()` is null while Bluetooth is off; "always set a time limit on your scan" (its sample stops after 10 s). Use for: Lesson 13 (primary source, Android side).
- [Android Developers: Connect to a GATT server](https://developer.android.com/develop/connectivity/bluetooth/ble/connect-gatt-server)
  Official guide to connectGatt(), service/characteristic discovery, read/write/notify. Use for: Week 2 BLE Steps 2–8.
- [Android Developers: Transfer BLE data](https://developer.android.com/develop/connectivity/bluetooth/ble/transfer-ble-data)
  Official guide to reading/writing characteristics and enabling notifications. Use for: Week 2 BLE Steps 6–8.
- [Apple Developer: Core Bluetooth Programming Guide](https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/AboutCoreBluetooth/Introduction.html)
  Official conceptual guide to CoreBluetooth (central/peripheral roles). Use for: Week 2 BLE Step 1 (iOS side).
- [Apple Developer: CBCentralManager](https://developer.apple.com/documentation/corebluetooth/cbcentralmanager)
  Official API reference for scanning/connecting to peripherals on iOS: a new manager's state is `unknown` until the delegate hears otherwise; the `delegate` is weak. Use for: Lesson 13 (primary source, iOS side).
- [Android Developers: Set up Bluetooth](https://developer.android.com/develop/connectivity/bluetooth/setup) and [Broadcasts overview](https://developer.android.com/develop/background-work/background-tasks/broadcasts)
  `getAdapter()` null means no Bluetooth; `isEnabled()`; the `ACTION_STATE_CHANGED` broadcast with `EXTRA_STATE`. Bluetooth's broadcasts come from a "highly privileged app", so the receiver needs `RECEIVER_EXPORTED`; always unregister. Use for: Lesson 13 (Bluetooth turned off during a scan, which the scan callback never reports).
- [Apple Developer: CBCentralManagerDelegate](https://developer.apple.com/documentation/corebluetooth/cbcentralmanagerdelegate), [scanForPeripherals(withServices:options:)](https://developer.apple.com/documentation/corebluetooth/cbcentralmanager/scanforperipherals(withservices:options:)), [CBUUID](https://developer.apple.com/documentation/corebluetooth/cbuuid), [CBCharacteristicProperties](https://developer.apple.com/documentation/corebluetooth/cbcharacteristicproperties), [CBPeer.identifier](https://developer.apple.com/documentation/corebluetooth/cbpeer/identifier)
  A state below `poweredOn` means scanning has stopped; a `nil` service list returns every peripheral, but Apple recommends listing service UUIDs; 16-bit UUIDs expand on the Bluetooth base UUID; notify vs indicate (without / with a response from the central); the identifier is a UUID the system assigns, not the address. Use for: Lesson 13.
- [Kotlin: callbackFlow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/callback-flow.html), [trySend](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/-send-channel/try-send.html), [close](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/-send-channel/close.html)
  Turning a callback API into a cold `Flow`; `awaitClose` is mandatory and runs on cancellation; `trySend` never suspends; `close(cause)` fails the collector with that cause. Use for: Lesson 13 (both BLE adapters).
- [Android emulator: advanced networking (network simulator)](https://developer.android.com/studio/run/emulator-networking-advanced)
  The emulator's radios are simulated ("without using physical radios"), so it can't hear a peripheral on your Mac. Use for: Lesson 13 (why BLE needs real phones).
- [LightBlue (App Store)](https://apps.apple.com/us/app/lightblue/id557428110)
  Punch Through's BLE app for iPhone, iPad and Mac (macOS 13.3+): advertise a virtual peripheral built from scratch or cloned. Use for: Lesson 13 (the test peripheral on your Mac), Lessons 14–16.
- [Apple Developer: discoverCharacteristics(_:for:)](https://developer.apple.com/documentation/corebluetooth/cbperipheral/1518797-discovercharacteristics), [readValue(for:)](https://developer.apple.com/documentation/corebluetooth/cbperipheral/readvalue(for:)-6u2kr), [peripheral(_:didDiscoverCharacteristicsFor:error:)](https://developer.apple.com/documentation/corebluetooth/cbperipheraldelegate/peripheral(_:diddiscovercharacteristicsfor:error:))
  Official CBPeripheral/CBPeripheralDelegate reference for service/characteristic discovery and reading values. Use for: Week 2 Day 3 (iOS side).
- [Android Developers: Fragment lifecycle](https://developer.android.com/guide/fragments/lifecycle)
  Official Fragment lifecycle guide — states, callbacks, relationship to the host Activity's lifecycle. Use for: understanding the FirstFragment/SecondFragment + NavHostFragment setup in the demo project.
- [Android Developers: Create a navigation controller](https://developer.android.com/guide/navigation/navcontroller) / [Design your navigation graph](https://developer.android.com/guide/navigation/design)
  Official Navigation component docs — NavHostFragment, NavController, nav graph, destinations, actions. Use for: why only the start destination shows by default, and how navigate() reaches other destinations.

- [Android Developers: Request runtime permissions](https://developer.android.com/training/permissions/requesting)
  Official guide to checkSelfPermission, `shouldShowRequestPermissionRationale`, the Activity Result API (RequestPermission/RequestMultiplePermissions), and handling denial ("don't link to system settings in an effort to convince the user"). It doesn't say when the rationale call returns false, or what dismissing the dialog does: Lesson 12 records what the emulators showed. Use for: Lesson 12 (primary source, Android side).
- [Apple Developer: Requesting authorization to capture and save media](https://developer.apple.com/documentation/avfoundation/requesting-authorization-to-capture-and-save-media)
  Official guide to camera/photo library authorization on iOS. Use for: Week 2 Day 1 permission exercise (iOS camera side).
- [Apple Developer: CBManagerAuthorization](https://developer.apple.com/documentation/corebluetooth/cbmanagerauthorization) and [CBManager.authorization](https://developer.apple.com/documentation/corebluetooth/cbmanager/authorization-swift.type.property)
  Official reference for Bluetooth's authorization states (notDetermined/allowedAlways/restricted/denied); the class property can be read before creating a manager and never prompts. The iOS Simulator always reports allowedAlways. Use for: Lesson 12 (primary source, iOS side), Lesson 13.
- [Android Developers: Bluetooth permissions](https://developer.android.com/develop/connectivity/bluetooth/bt-permissions) and [Android 11 permission updates](https://developer.android.com/about/versions/11/privacy/permissions)
  BLUETOOTH_SCAN/CONNECT as "Nearby devices" runtime permissions on Android 12+, `maxSdkVersion="30"` for the legacy ones, ACCESS_FINE_LOCATION on Android 11 and lower, `neverForLocation` (filters some beacons); two refusals mean "don't ask again", flagged USER_SET/USER_FIXED. Also `<uses-feature android:name="android.hardware.bluetooth_le" android:required="false"/>` with a `hasSystemFeature(FEATURE_BLUETOOTH_LE)` check at run time. Use for: Lesson 12, Lesson 13 (the manifest the real scanner needs).
- [Android Developers: Get a result from an activity](https://developer.android.com/training/basics/intents/result) and [Compose: requesting runtime permissions](https://developer.android.com/develop/ui/compose/libraries)
  `registerForActivityResult` before the Fragment/Activity is created, unconditionally, every time; `rememberLauncherForActivityResult` in Compose. Use for: Lesson 12 (why the screen lends the adapter its launcher).
- [Apple Developer: Requesting access to protected resources](https://developer.apple.com/documentation/uikit/requesting-access-to-protected-resources) and [Core Bluetooth](https://developer.apple.com/documentation/corebluetooth)
  The prompt comes on first use and never again; always re-check, because the person can change it in Settings; a missing NSBluetoothAlwaysUsageDescription crashes the app. Use for: Lesson 12.
- [SKIE: Suspend functions](https://skie.touchlab.co/features/suspend) and [SE-0423: Dynamic actor isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0423-dynamic-actor-isolation.md)
  A Swift class implementing a Kotlin `suspend fun` implements the `__`-prefixed original (SKIE keeps the plain name for its async wrapper); `@preconcurrency` conformances let a `@MainActor` class satisfy a Kotlin protocol, checked at run time. Use for: Lesson 12 (the first Swift outbound adapter), Lesson 13.

- [Kotlin: Data classes](https://kotlinlang.org/docs/data-classes.html), [Sealed classes and interfaces](https://kotlinlang.org/docs/sealed-classes.html), [Lambdas](https://kotlinlang.org/docs/lambdas.html), [Extensions](https://kotlinlang.org/docs/extensions.html)
  Official Kotlin reference pages. Use for: Lesson 01.
- [Kotlin: Coroutines basics](https://kotlinlang.org/docs/coroutines-basics.html) and [Asynchronous Flow](https://kotlinlang.org/docs/flow.html)
  Official guides to suspend functions, scopes, structured concurrency, and cold flows. Use for: Lesson 01 (primary source), and again in Lessons 08 and 13.
- [Android Developers: StateFlow and SharedFlow](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow)
  Official guide to hot flows and the backing-property pattern. Use for: Lesson 01, Lesson 08.
- [Swift book: Structures and Classes](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures/), [Enumerations](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations/), [Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols/), [Closures](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures/), [Concurrency](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/)
  Official Swift book chapters. Use for: Lesson 02 (Concurrency is the primary source).
- [Apple: AsyncStream](https://developer.apple.com/documentation/swift/asyncstream) and [MainActor](https://developer.apple.com/documentation/swift/mainactor)
  Official API reference. Use for: Lesson 02. (Lesson 13 bridges CoreBluetooth callbacks into a Kotlin `Flow` instead, because the consumer is Kotlin: see callbackFlow.)
- [SE-0343: Concurrency in top-level code](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0343-top-level-concurrency.md)
  Swift Evolution proposal: why `main.swift` can `await` and runs on the main actor. Use for: Lesson 02.
- [Kotlin Playground](https://play.kotlinlang.org/)
  Run Kotlin in the browser. Use for: quick experiments without a project.

- [Android: Handle configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes), [Intents and intent filters](https://developer.android.com/guide/components/intents-filters), [App manifest overview](https://developer.android.com/guide/topics/manifest/manifest-intro), [Gradle build overview](https://developer.android.com/build/gradle-build-overview), [Logcat](https://developer.android.com/studio/debug/logcat)
  Official Android guides. Use for: Lesson 03.
- [Android: Migrate to built-in Kotlin](https://developer.android.com/build/migrate-to-built-in-kotlin) and [AGP release notes](https://developer.android.com/build/releases/gradle-plugin)
  AGP 9+: Kotlin built in, `org.jetbrains.kotlin.android` fails the build, KMP modules need `com.android.kotlin.multiplatform.library`; AGP 9.4 needs Gradle 9.6+. Use for: Lesson 03, Lesson 05.
- [Android 12 behaviour changes: Back on root launcher activities](https://developer.android.com/about/versions/12/behavior-changes-all) and [Predictive back](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture)
  Use for: the Lesson 03 "Back" gotcha (documented vs observed behaviour).
- [SwiftUI: ScenePhase](https://developer.apple.com/documentation/swiftui/scenephase), [App](https://developer.apple.com/documentation/swiftui/app), [onAppear](https://developer.apple.com/documentation/swiftui/view/onappear(perform:)); [UIKit: UISceneDelegate](https://developer.apple.com/documentation/uikit/uiscenedelegate), [applicationWillTerminate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/applicationwillterminate(_:))
  Official Apple references for both lifecycle levels, per track. Use for: Lesson 04.
- [Apple: Information property list](https://developer.apple.com/documentation/bundleresources/information-property-list) and [Logger](https://developer.apple.com/documentation/os/logger)
  Use for: Lesson 04.
- [XcodeGen](https://github.com/yonaskolb/XcodeGen)
  Generates an Xcode project from a YAML spec, which lets agents create iOS scratch apps without Xcode's GUI. Use for: Lesson 04, and the KMP project's `iosApp` from Lesson 05 on.
- [Kotlin Multiplatform: project structure](https://kotlinlang.org/docs/multiplatform/multiplatform-discover-project.html), [Hierarchical project structure](https://kotlinlang.org/docs/multiplatform/multiplatform-hierarchy.html) and [Expected and actual declarations](https://kotlinlang.org/docs/multiplatform/multiplatform-expect-actual.html)
  Official JetBrains docs: targets, source sets, intermediate source sets, expect/actual rules and when to prefer interfaces. Use for: Lesson 05 (project structure is the primary source), Lesson 10 (why ports are interfaces).
- [Android: Set up the Android Gradle Library Plugin for KMP](https://developer.android.com/kotlin/multiplatform/plugin)
  `com.android.kotlin.multiplatform.library`; `android { }` inside `kotlin { }` from AGP 8.12 (`androidLibrary { }` deprecated); `com.android.library` for KMP deprecated from AGP 9. Use for: Lesson 05.
- [Kotlin/Native: interoperability with Swift/Objective-C](https://kotlinlang.org/docs/native-objc-interop.html)
  How Kotlin declarations appear in Swift (file-named `…Kt` classes, `object` → `.shared`, type mapping, suspend functions). Use for: Lesson 05, Lessons 08–09.
- [KMP: Direct integration with Xcode](https://kotlinlang.org/docs/multiplatform/multiplatform-direct-integration.html)
  The script build phase running `embedAndSignAppleFrameworkForXcode`, and disabling user script sandboxing. Use for: Lesson 05.
- [Codelab: Get started with Kotlin Multiplatform](https://developer.android.com/codelabs/kmp-get-started) and [JetBrains: share more logic between iOS and Android](https://kotlinlang.org/docs/multiplatform/multiplatform-upgrade-app.html)
  Google's codelab adds a shared module to existing apps (uses SKIE); JetBrains' tutorial shows the current wizard layout (`sharedLogic`, `androidApp`, `iosApp`). Use for: Lesson 05 further reading.
- [Android: Display content edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge)
  targetSdk 35+ draws behind system bars by default; insets handling for Compose and Views. Use for: Lesson 05, Lesson 06.

- [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model), [State and Jetpack Compose](https://developer.android.com/develop/ui/compose/state), [Side-effects in Compose](https://developer.android.com/develop/ui/compose/side-effects), [Lists and grids](https://developer.android.com/develop/ui/compose/lists), [Configure text fields](https://developer.android.com/develop/ui/compose/text/user-input)
  Official Compose guides: the declarative model and recomposition (primary source for Lesson 06), remember/rememberSaveable, hoisting and unidirectional data flow, where side effects go, item keys (Bundle-able), TextFieldState recommendation. Use for: Lesson 06, Lesson 07 (item keys), Lesson 08.
- [Android: Navigation](https://developer.android.com/guide/navigation) (setup, "use Navigation Compose" guidance), [Type safety in Navigation](https://developer.android.com/guide/navigation/design/type-safety), [Navigation 3](https://developer.android.com/guide/navigation/navigation-3)
  `@Serializable` routes, `composable<T>`, `toRoute()`; Fragment navigation for Views apps; Nav3 (back stack as a list you own) as the newer alternative. Use for: Lesson 07.
- [Android: Processes and threads](https://developer.android.com/guide/components/processes-and-threads)
  The two single-thread rules (don't block the UI thread; don't touch the UI toolkit off it). Use for: Lesson 07 (section 3), Lesson 13 (BLE callback threads).
- [SwiftUI: State](https://developer.apple.com/documentation/swiftui/state), [List](https://developer.apple.com/documentation/swiftui/list), [NavigationStack](https://developer.apple.com/documentation/swiftui/navigationstack); [UIKit: UITableViewDiffableDataSource](https://developer.apple.com/documentation/uikit/uitableviewdiffabledatasource)
  Official Apple references: @State as single source of truth (and "safe to mutate from any thread"), Identifiable lists, value-based navigation and path binding, snapshot-diffed tables. Use for: Lesson 06 (State is the iOS primary source), Lesson 07 (lists, navigation), Lesson 08.

- [Android: UI layer](https://developer.android.com/topic/architecture/ui-layer) and [UI events](https://developer.android.com/topic/architecture/ui-layer/events)
  UI state, immutability, unidirectional data flow, exposing state as `StateFlow`; "ViewModel events should always result in a UI state update" (user message + `messageShown()`), and why Channels can lose events. Use for: Lesson 08 (UI layer is the primary source), Lesson 16 (errors).
- [Android: ViewModel overview](https://developer.android.com/topic/libraries/architecture/viewmodel), [KMP ViewModel](https://developer.android.com/kotlin/multiplatform/viewmodel), [Coroutines with lifecycle-aware components](https://developer.android.com/topic/libraries/architecture/coroutines) and [for Views](https://developer.android.com/topic/libraries/architecture/views/coroutines-views)
  ViewModel lifetime and scopes, `viewModelScope`, `SavedStateHandle`; the multiplatform `ViewModel` (2.8+) and the iOS `ViewModelStoreOwner` + `resolveViewModel` pattern; `collectAsStateWithLifecycle`, `repeatOnLifecycle(STARTED)`. Use for: Lesson 08, Lesson 11.
- [SKIE](https://skie.touchlab.co/): [Flows](https://skie.touchlab.co/features/flows), [Sealed classes](https://skie.touchlab.co/features/sealed); [releases](https://github.com/touchlab/SKIE/releases)
  Touchlab's compiler plugin: flows as typed `AsyncSequence`, `onEnum(of:)`, suspend as async. Flows convert Kotlin → Swift only ("from `AsyncSequence` to `Flow`" isn't supported), so a Swift class implementing a Kotlin method that returns a `Flow` returns a `SkieSwiftFlow` it got from Kotlin (Lesson 13). Before bumping Kotlin, check the [changelog](https://skie.touchlab.co/changelog/0.10.15): each release names the Kotlin version it adds support for (0.10.15 supports up to 2.4.20). The GitHub release notes don't list Kotlin versions. Use for: Lesson 09.
- [Kotlin: Swift export](https://kotlinlang.org/docs/native-swift-export.html)
  JetBrains' Kotlin→Swift export, Alpha: flows as `AsyncSequence`, sealed types as enums. Use for: Lesson 09, section 4 (where interop is heading).
- [KMP-NativeCoroutines](https://github.com/rickclephas/KMP-NativeCoroutines) and [KMP-ObservableViewModel](https://github.com/rickclephas/KMP-ObservableViewModel); [Compose Multiplatform: common ViewModel](https://kotlinlang.org/docs/multiplatform/compose-viewmodel.html)
  Alternatives to SKIE + a hand-written owner; JetBrains' page recommends KMP-ObservableViewModel for SwiftUI. Use for: Lesson 09, section 4, reading other KMP codebases.

- [Android: Guide to app architecture](https://developer.android.com/topic/architecture) and [Domain layer](https://developer.android.com/topic/architecture/domain-layer)
  Separation of concerns, UI/data/optional domain layers, "Manage dependencies between components" (DI vs service locator); use cases: `VerbNounUseCase`, `operator fun invoke`, no mutable data, main-safe. Note the guide's domain depends on data; in the course's hexagon the app core owns the ports and the adapters depend on it. Use for: reading Clean-style Android code (Lesson 10's sidebar maps its words to the hexagon).
- [Alistair Cockburn: Hexagonal architecture (Ports and Adapters)](https://alistair.cockburn.us/hexagonal-architecture/)
  The original article: a port as "a purposeful conversation", one adapter per external device, test harnesses as adapters, primary/secondary actors and driving/driven adapters, why the drawing is a hexagon. Use for: Lesson 10 (primary source).
- [Android: Dependency injection](https://developer.android.com/training/dependency-injection) and [Manual dependency injection](https://developer.android.com/training/dependency-injection/manual)
  Constructor vs field injection, DI vs service locator, the `AppContainer` pattern and its costs as an app grows. Use for: Lesson 10 (DI by hand), Lesson 11 (what Koin adds).
- [Koin](https://insert-koin.io/): [definitions](https://insert-koin.io/docs/reference/koin-core/definitions/), [ViewModel](https://insert-koin.io/docs/reference/koin-core/viewmodel/), [KoinComponent](https://insert-koin.io/docs/reference/koin-core/koin-component/), [Compose](https://insert-koin.io/docs/reference/koin-compose/compose/), [Android ViewModel](https://insert-koin.io/docs/reference/koin-android/viewmodel/), [KMP](https://insert-koin.io/docs/reference/koin-mp/kmp/)
  `single`/`factory`/`viewModelOf`, `koinViewModel()` (koin-compose-viewmodel), `by viewModel()` (koin-android), KoinComponent only at the edges. The docs say little about iOS ViewModels; the course's Koin-backed `ViewModelProvider.Factory` comes from reading Koin 4.2.2's sources (`KoinViewModelFactory`, `resolveViewModel`). Use for: Lesson 11, and the later lessons that bind real adapters (Lesson 13 on).
- [Android: Test Kotlin coroutines](https://developer.android.com/kotlin/coroutines/test) and [Test doubles](https://developer.android.com/training/testing/fundamentals/test-doubles)
  `runTest` and virtual time, `StandardTestDispatcher` vs `UnconfinedTestDispatcher`, `Dispatchers.setMain` (in setup, not a property); fakes preferred over mocks. Use for: Lesson 11, Lesson 16 (the session service's connection-state tests).
- [Turbine](https://github.com/cashapp/turbine)
  `flow.test { awaitItem() }`, 3 s wall-clock timeout, unconsumed events fail the test. Use for: Lesson 11, Lesson 16.
- [Kotlin: Test your multiplatform app](https://kotlinlang.org/docs/multiplatform/multiplatform-run-tests.html) and [Android-KMP plugin: host and device tests](https://developer.android.com/kotlin/multiplatform/plugin)
  `commonTest` + `kotlin.test` on JVM (JUnit 4) and iOS (Kotlin/Native runner), `allTests`; the Android-KMP plugin disables host tests until `withHostTest {}`. Use for: Lesson 11.

## Wisdom (Communities)

- [r/androiddev](https://reddit.com/r/androiddev)
  Active, well-moderated Android development subreddit. Use for: troubleshooting Android-specific issues, lifecycle/BLE edge cases.
- [r/Kotlin](https://reddit.com/r/Kotlin)
  Kotlin language subreddit. Use for: Kotlin idioms, coroutines/Flow questions.
- [r/iOSProgramming](https://reddit.com/r/iOSProgramming)
  Broad iOS development community. Use for: platform behaviour questions (lifecycle, permissions).
- [r/swift](https://reddit.com/r/swift)
  Swift-focused subreddit. Use for: Swift/iOS troubleshooting and idiom questions.
- [Kotlin Slack, #multiplatform channel](https://surveys.jetbrains.com/s3/kotlin-slack-sign-up)
  Official Kotlin community Slack; JetBrains engineers answer KMP questions. Use for: KMP build and interop questions (Lesson 05 on). Channel #koin: Koin's maintainers (Lesson 11 on).
- [Stack Overflow — android-bluetooth](https://stackoverflow.com/questions/tagged/android-bluetooth) / [core-bluetooth](https://stackoverflow.com/questions/tagged/core-bluetooth) tags
  High-signal Q&A for concrete BLE bugs on both platforms. Use for: debugging real device/peripheral issues.

## Gaps

- No vetted resource yet for camera/media capture APIs (Android CameraX/Intent-based capture, iOS UIImagePickerController/PHPicker) — search when Week 2 Day 5 arrives.
- No vetted resource yet for background execution mechanisms (Android WorkManager/foreground service, iOS BGTaskScheduler) — search when Week 3 arrives.
