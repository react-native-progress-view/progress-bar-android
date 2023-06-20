#pragma once

#include "RNCProgressBarState.h"
#include "RNCProgressBarMeasurementsManager.h"
#include <react/renderer/components/rnandroidprogressbar/Props.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/components/view/ViewEventEmitter.h>
#include <jsi/jsi.h>
#include <yoga/Yoga.h>
#include <react/renderer/components/view/conversions.h>

namespace facebook
{
  namespace react
  {

    JSI_EXPORT extern const char RNCProgressBarComponentName[];

    class JSI_EXPORT RNCProgressBarShadowNode final : public ConcreteViewShadowNode<
                                                          RNCProgressBarComponentName,
                                                          RNCProgressBarProps,
                                                          ViewEventEmitter,
                                                          RNCProgressBarState>
    {
    public:
      using ConcreteViewShadowNode::ConcreteViewShadowNode;
      // Associates a shared `RNCProgressBarMeasurementsManager` with the node.
      void setProgressBarMeasurementsManager(
          const std::shared_ptr<RNCProgressBarMeasurementsManager>
              &measurementsManager);

#pragma mark - LayoutableShadowNode

      Size measureContent(
          LayoutContext const &layoutContext,
          LayoutConstraints const &layoutConstraints) const override;

    private:
      std::shared_ptr<RNCProgressBarMeasurementsManager> measurementsManager_;
    };

  } // namespace react
} // namespace facebook
