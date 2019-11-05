package com.kunaticker;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.bolan9999.SpringScrollViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {

            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();

            packages.add(new MainReactPackage());
            packages.add(new SpringScrollViewPackage());
            packages.add(new VectorIconsPackage());
            packages.add(new RNGestureHandlerPackage());
            packages.add(new RNLanguagesPackage());
            packages.add(new RNFirebasePackage());
            packages.add(new RNFirebaseAnalyticsPackage());
            packages.add(new RNFirebaseRemoteConfigPackage());
            packages.add(new RNFirebasePerformancePackage());
            packages.add(new RNFirebaseNotificationsPackage());
            packages.add(new RNFirebaseMessagingPackage());
            packages.add(new RNFirebaseCrashlyticsPackage());
            packages.add(new RNFirebaseAdMobPackage());
            packages.add(new RNDeviceInfo());
            packages.add(new SvgPackage());
            packages.add(new RandomBytesPackage());
            packages.add(new SplashScreenReactPackage());
            packages.add(new AsyncStoragePackage());
            packages.add(new SpringScrollViewPackage());

            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
