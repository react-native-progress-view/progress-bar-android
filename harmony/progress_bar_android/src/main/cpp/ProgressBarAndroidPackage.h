#include "RNOH/Package.h"
#include "ComponentDescriptors.h"
#include "ProgressBarAndroidComponentJSIBinder.h"
#include "ProgressBarAndroidComponentNapiBinder.h"
#include "glog/logging.h"

namespace rnoh {

class ProgressBarAndroidPackage : public Package {
    
public:
    ProgressBarAndroidPackage(Package::Context ctx) : Package(ctx) {}

    std::vector<facebook::react::ComponentDescriptorProvider> createComponentDescriptorProviders() override {
        return {
            facebook::react::concreteComponentDescriptorProvider<facebook::react::RNCProgressBarComponentDescriptor>(),
        };
    }
    
    ComponentJSIBinderByString createComponentJSIBinderByName() override{
        return {
        {"RNCProgressBar",std::make_shared<ProgressBarAndroidComponentJSIBinder>()},
        };
    }
    
    ComponentNapiBinderByString createComponentNapiBinderByName() override{
        return {
        {"RNCProgressBar", std::make_shared<ProgressBarAndroidComponentNapiBinder>()},
        };
    }
    
};
} // namespace rnoh
