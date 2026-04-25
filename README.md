# Jaufar Tafsir (Android)

A high-performance, fully offline hybrid Android application providing the Tafsir (exegesis) of the Quran in Dhivehi and Arabic. This app utilizes a "Native-Wrapper" architecture, hosting a specialized web-based interface optimized for local performance and diacritic-insensitive search.

## Key Features

- **100% Offline:** All Quranic text, Tafsir data, and interface assets are stored locally within the APK.
- **Advanced Search:** Custom normalization logic for Arabic (Tashkeel) and Dhivehi (Thikijehi) diacritics, allowing users to find verses regardless of script variations.
- **Multi-Translation Support:** Hot-swappable translation columns (Bakurube, Official Translation, etc.) powered by a dynamic JSON-to-DataTable engine.
- **Performance Optimized:**
  - *Native Bridge:* Uses a `JavascriptInterface` for high-speed asset reading.
  - *State Persistence:* Custom WebView history management to prevent `TransactionTooLargeException` in Android's `onSaveInstanceState`.
- **Modern UI:** Particle-background landing page, Material Design ripple effects, and system-wide Dark Mode synchronization.

## Technical Architecture

### The Hybrid Stack
- **Native:** Kotlin-based `MainActivity` using WebView and SplashScreen API.
- **Frontend:** HTML5, CSS3, and JavaScript.
- **Data Layer:** Large-scale JSON arrays stored in `assets/js/json/`.
- **Libraries:**
  - **DataTables:** For high-speed verse rendering.

### Native-Web Bridge (Android Interface)
The app exposes a native object to JavaScript for features that standard WebViews cannot handle efficiently:
- `isDarkMode()`: Informs the web layer of the system theme.
- `readAsset(path)`: Allows the JavaScript layer to read local files directly as strings, bypassing standard XHR limitations for local assets.

## Full Project Tree

```text
jaufarTafsirApp/
├── app/
│   ├── build.gradle                 # Module-level Gradle config (API 36, dependencies)
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml   # App permissions & Activity declarations
│           ├── java/com/jaufar/tafsir/
│           │   ├── MainActivity.kt   # Core WebView, Native Bridge, & Theme syncing
│           │   └── ui/               # Potential Jetpack Compose UI components
│           ├── res/                  # Android resources (XML, Layouts, Drawables)
│           │   ├── drawable/         # Launch icons and native drawables
│           │   ├── layout/           # Native UI layouts (if any)
│           │   └── values/           # Colors, Strings, & Material 3 Themes
│           └── assets/               # --- WEB LAYER (THE "APP" UI) ---
│               ├── books/
│               │   └── index.html    # The main landing page/home screen
│               ├── page/             # Content pages (Static HTML & Markdown source)
│               │   ├── about.html    # Wrapper for 'about.md'
│               │   ├── about.md      # Content for "About the App"
│               │   ├── team.html     # Wrapper for 'team.md'
│               │   ├── team.md       # Content for "The Team"
│               │   ├── contact.html  # Wrapper for 'contact.md'
│               │   └── contact.md    # Content for "Contact Us"
│               ├── js/               # --- LOGIC LAYER ---
│               │   ├── json/         # THE CORE DATA (JSON)
│               │   │   ├── QRN-Data_juz-surah-ayahNo-basmalah-ayahImlai.json
│               │   │   ├── QRN-Data_rasmUthmani.json
│               │   │   └── jaufarTafsir.json
│               │   ├── index.js      # Animations & Interactive home page logic
│               │   ├── navbar.js     # Dynamic navbar generation & URL injection
│               │   ├── markdown-loader.js # Bridge logic to render Markdown as HTML
│               │   ├── DT-inline.js  # DataTable setup & search normalization
│               │   ├── quran-navigation-list.js # Nav-bar logic (Juz/Surah/Ayah)
│               │   ├── quran-navigation-objectMaps.js # Data for Quran navigation
│               │   ├── marked.min.js # Markdown parsing library
│               │   └── DT-COMB.min.js # Minified DataTables & Plugins
│               ├── css/              # --- STYLE LAYER ---
│               │   ├── main.css      # Core App styling (Typography, Layout)
│               │   └── dark-mode.css # Dark mode theme overrides
│               ├── img/              # --- ASSETS LAYER ---
│               │   ├── logo/         # App logos (SVG/PNG)
│               │   └── icons/        # Navigation and action icons
│               └── font/             # Specific fonts for Dhivehi (Thaana) support
├── gradle/                           # Gradle wrapper files
├── build.gradle                      # Project-level Gradle build script
├── settings.gradle                   # Project module definitions
└── gradle.properties                 # JVM & Build environment settings
```

## Development & Build

### Prerequisites
- Android Studio Panda 3 (or newer)
- JDK 17+
- Android SDK 36 (Target) / 24 (Min)

### Building
1. Clone the repository.
2. Open the project in Android Studio.
3. Sync Gradle.
4. Run the `app:assembleDebug` task or deploy directly to a device/emulator.

### Optimization Notes
The project uses R8 for aggressive minification. If you add new JavaScript interface methods, ensure they are protected in your `proguard-rules.pro` file:

```proguard
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
```



## Credits

- **Tafsir Content:** Jaufar (Dhivehi Translation)
- **Platform:** Developed by MAI
