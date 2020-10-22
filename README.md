# ionic_BazarNet-Poli
## Projeto modelo de Bazar Virtual


## Erro Capasitor

* import android.support.v4.content.FileProvider;

trocar por:

* import androidx.core.content.FileProvider;

ou 

* npm install jetifier --save
* npx jetifier

### Instação do premission (https://ionicframework.com/docs/native/android-permissions)
* npm install cordova-plugin-android-permissions
* npm install @ionic-native/android-permissions

### Google maps (https://github.com/ionic-team/ionic-native-google-maps)
* npm install @ionic-native/core@beta @ionic-native/google-maps@beta
* ionic cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps#multiple_maps (cordova)
* npm i https://github.com/mapsplugin/cordova-plugin-googlemaps#multiple_maps (capacitor)

