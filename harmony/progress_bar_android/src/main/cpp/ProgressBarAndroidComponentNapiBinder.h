#pragma once
#include "RNOH/BaseComponentNapiBinder.h"
#include "Props.h"
#include "RNOHCorePackage/ComponentBinders/ViewComponentNapiBinder.h"
#include "glog/logging.h"

namespace rnoh {

class ProgressBarAndroidComponentNapiBinder : public ViewComponentNapiBinder {
public:
    napi_value createProps(napi_env env, facebook::react::ShadowView const shadowView) override {
        napi_value napiBaseProps = ViewComponentNapiBinder::createProps(env, shadowView);
        if (auto props = std::dynamic_pointer_cast<const facebook::react::RNCProgressBarProps>(shadowView.props)) {
            return ArkJS(env)
                .getObjectBuilder(napiBaseProps)
                .addProperty("styleAttr", props->styleAttr)
                .addProperty("indeterminate", props->indeterminate)
                .addProperty("progress", props->progress)
                .addProperty("animating", props->animating)
                .addProperty("color", props->color)
                .build();
        }
        return napiBaseProps;
    };
};

} // namespace rnoh
