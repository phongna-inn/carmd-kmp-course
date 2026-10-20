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
  Official BLE concepts guide (central/peripheral, GATT, services/characteristics). Use for: Week 2 BLE Step 1.
- [Android Developers: Find BLE devices](https://developer.android.com/develop/connectivity/bluetooth/ble/find-ble-devices)
  Official guide to BluetoothLeScanner.startScan()/stopScan() and ScanCallback. Use for: Week 2 Day 2 scan implementation (Android side).
- [Android Developers: Connect to a GATT server](https://developer.android.com/develop/connectivity/bluetooth/ble/connect-gatt-server)
  Official guide to connectGatt(), service/characteristic discovery, read/write/notify. Use for: Week 2 BLE Steps 2–8.
- [Android Developers: Transfer BLE data](https://developer.android.com/develop/connectivity/bluetooth/ble/transfer-ble-data)
  Official guide to reading/writing characteristics and enabling notifications. Use for: Week 2 BLE Steps 6–8.
- [Apple Developer: Core Bluetooth Programming Guide](https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/AboutCoreBluetooth/Introduction.html)
  Official conceptual guide to CoreBluetooth (central/peripheral roles). Use for: Week 2 BLE Step 1 (iOS side).
- [Apple Developer: CBCentralManager](https://developer.apple.com/documentation/corebluetooth/cbcentralmanager)
  Official API reference for scanning/connecting to peripherals on iOS. Use for: Week 2 BLE Steps 2–3 (iOS side).
- [Apple Developer: discoverCharacteristics(_:for:)](https://developer.apple.com/documentation/corebluetooth/cbperipheral/1518797-discovercharacteristics), [readValue(for:)](https://developer.apple.com/documentation/corebluetooth/cbperipheral/readvalue(for:)-6u2kr), [peripheral(_:didDiscoverCharacteristicsFor:error:)](https://developer.apple.com/documentation/corebluetooth/cbperipheraldelegate/peripheral(_:diddiscovercharacteristicsfor:error:))
  Official CBPeripheral/CBPeripheralDelegate reference for service/characteristic discovery and reading values. Use for: Week 2 Day 3 (iOS side).
- [Android Developers: Fragment lifecycle](https://developer.android.com/guide/fragments/lifecycle)
  Official Fragment lifecycle guide — states, callbacks, relationship to the host Activity's lifecycle. Use for: understanding the FirstFragment/SecondFragment + NavHostFragment setup in the demo project.
- [Android Developers: Create a navigation controller](https://developer.android.com/guide/navigation/navcontroller) / [Design your navigation graph](https://developer.android.com/guide/navigation/design)
  Official Navigation component docs — NavHostFragment, NavController, nav graph, destinations, actions. Use for: why only the start destination shows by default, and how navigate() reaches other destinations.

- [Android Developers: Request runtime permissions](https://developer.android.com/training/permissions/requesting)
  Official guide to checkSelfPermission, the Activity Result API (RequestPermission/RequestMultiplePermissions), and handling denial. Use for: Week 2 Day 1 permission exercise (Android side).
- [Apple Developer: Requesting authorization to capture and save media](https://developer.apple.com/documentation/avfoundation/requesting-authorization-to-capture-and-save-media)
  Official guide to camera/photo library authorization on iOS. Use for: Week 2 Day 1 permission exercise (iOS camera side).
- [Apple Developer: CBManagerAuthorization](https://developer.apple.com/documentation/corebluetooth/cbmanagerauthorization)
  Official reference for Bluetooth's authorization states (notDetermined/allowedAlways/restricted/denied). Use for: Week 2 Day 1 permission exercise (iOS Bluetooth side).

## Wisdom (Communities)

- [r/androiddev](https://reddit.com/r/androiddev)
  Active, well-moderated Android development subreddit. Use for: troubleshooting Android-specific issues, lifecycle/BLE edge cases.
- [r/swift](https://reddit.com/r/swift)
  Swift-focused subreddit. Use for: Swift/iOS troubleshooting and idiom questions.
- [Stack Overflow — android-bluetooth / corebluetooth tags](https://stackoverflow.com/questions/tagged/android-bluetooth)
  High-signal Q&A for concrete BLE bugs on both platforms. Use for: debugging real device/peripheral issues.

## Gaps

- No vetted resource yet for camera/media capture APIs (Android CameraX/Intent-based capture, iOS UIImagePickerController/PHPicker) — search when Week 2 Day 5 arrives.
- No vetted resource yet for background execution mechanisms (Android WorkManager/foreground service, iOS BGTaskScheduler) — search when Week 3 arrives.
- No vetted resource yet for a concrete BLE test peripheral (nRF Connect app usage, or ESP32 BLE firmware) — needed before Week 2 Day 2.
