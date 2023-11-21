#pragma once
#include "RNOH/UIManagerModule.h"
#include "RNOH/BaseComponentJSIBinder.h"
#include "RNOHCorePackage/ComponentBinders/ViewComponentJSIBinder.h"
#include "glog/logging.h"
namespace rnoh {
class ProgressBarAndroidComponentJSIBinder : public ViewComponentJSIBinder {
protected:
    facebook::jsi::Object createNativeProps(facebook::jsi::Runtime &rt) override {
        auto nativeProps = ViewComponentJSIBinder::createNativeProps(rt);
        nativeProps.setProperty(rt, "styleAttr", "string");
        nativeProps.setProperty(rt, "indeterminate", "boolean");
        nativeProps.setProperty(rt, "progress", "number");
        nativeProps.setProperty(rt, "animating", "boolean");
        nativeProps.setProperty(rt, "color", "Color");
        return nativeProps;
    }
//
//    facebook::jsi::Object createBubblingEventTypes(facebook::jsi::Runtime &rt) override {
//        return facebook::jsi::Object(rt);
//    }
//
};

} // namespace rnoh