#pragma once

#include <react/renderer/components/rnandroidprogressbar/Props.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/core/LayoutConstraints.h>
#include <react/utils/ContextContainer.h>

namespace facebook
{
    namespace react
    {

        class RNCProgressBarMeasurementsManager
        {
        public:
            RNCProgressBarMeasurementsManager(
                const ContextContainer::Shared &contextContainer)
                : contextContainer_(contextContainer) {}

            Size measure(SurfaceId surfaceId, LayoutConstraints layoutConstraints, RNCProgressBarProps props) const;

        private:
            const ContextContainer::Shared contextContainer_;
            mutable std::mutex mutex_;
            mutable std::unordered_map<std::string, Size> cachedMeasurements_ = {};
        };

    } // namespace react
} // namespace facebook
