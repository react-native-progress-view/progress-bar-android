#pragma once

#include <react/debug/react_native_assert.h>
#include "RNCProgressBarShadowNode.h"
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
            using ConcreteComponentDescriptor::ConcreteComponentDescriptor;

            void adopt(ShadowNode::Unshared const &shadowNode) const override
            {
                react_native_assert(
                    std::dynamic_pointer_cast<RNCProgressBarShadowNode>(shadowNode));
                auto barShadowNode =
                    std::static_pointer_cast<RNCProgressBarShadowNode>(shadowNode);

                react_native_assert(
                    std::dynamic_pointer_cast<YogaLayoutableShadowNode>(barShadowNode));
                auto layoutableShadowNode =
                    std::static_pointer_cast<YogaLayoutableShadowNode>(barShadowNode);

//                auto state =
//                    std::static_pointer_cast<const RNCProgressBarShadowNode::ConcreteState>(
//                        shadowNode->getState());
//                auto stateData = state->getData();

                // if (stateData.frameSize.width != 0 && stateData.frameSize.height != 0)
                {
                    layoutableShadowNode->setSize(
                        Size{200, 50});
                    // Size{stateData.frameSize.width, stateData.frameSize.height});
                }

                ConcreteComponentDescriptor::adopt(shadowNode);
            }
        };

    } // namespace react
} // namespace facebook
