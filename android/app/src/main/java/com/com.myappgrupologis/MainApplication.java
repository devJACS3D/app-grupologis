package com.myappgrupologis

import android.app.Application;
import android.content.IntentFilter;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.RNFetchBlob.RNFetchBlobPackage;
import android.app.DownloadManager;

import com.myappgrupologis.DownloadReceiver;

import java.util.List;

public class MainApplication extends Application implements ReactApplication{
  private final ReactNativeHost mReactNativeHost =
  new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Agregar la clase de RNFetchBlobPackage
      packages.add(new RNFetchBlobPackage());
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
    // Agregar la definición del IntentFilter aquí
    IntentFilter intentFilter = new IntentFilter();
    intentFilter.addAction(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
    registerReceiver(new DownloadReceiver(), intentFilter);
  }

}
