#pragma once

#include <react/debug/react_native_assert.h>
#include "RNCProgressBarShadowNode.h"
#include "RNCProgressBarMeasurementsManager.h"
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/components/rnandroidprogressbar/Props.h>

namespace facebook
{
    namespace react
    {

        class RNCProgressBarComponentDescriptor final
            : public ConcreteComponentDescriptor<RNCProgressBarShadowNode>
        {
        public:
            RNCProgressBarComponentDescriptor(
                ComponentDescriptorParameters const &parameters)
                : ConcreteComponentDescriptor(parameters),
                  measurementsManager_(std::make_shared<RNCProgressBarMeasurementsManager>(
                      contextContainer_)) {}

            void adopt(ShadowNode::Unshared const &shadowNode) const override
            {
                ConcreteComponentDescriptor::adopt(shadowNode);

                assert(std::dynamic_pointer_cast<RNCProgressBarShadowNode>(shadowNode));
                auto barShadowNode =
                    std::static_pointer_cast<RNCProgressBarShadowNode>(shadowNode);

                // `RNCProgressBarShadowNode` uses `RNCProgressBarMeasurementsManager` to
                // provide measurements to Yoga.
                barShadowNode->setProgressBarMeasurementsManager(
                    measurementsManager_);

                // All `RNCProgressBarShadowNode`s must have leaf Yoga nodes with properly
                // setup measure function.
                barShadowNode->enableMeasurement();
            }

        private:
            const std::shared_ptr<RNCProgressBarMeasurementsManager> measurementsManager_;
        };

    } // namespace react
} // namespace facebook
