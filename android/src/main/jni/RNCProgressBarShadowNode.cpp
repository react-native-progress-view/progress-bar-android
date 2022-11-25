#include "RNCProgressBarShadowNode.h"
#include "RNCProgressBarMeasurementsManager.h"

namespace facebook
{
    namespace react
    {

        extern const char RNCProgressBarComponentName[] = "RNCProgressBar";

        void RNCProgressBarShadowNode::setProgressBarMeasurementsManager(
            const std::shared_ptr<RNCProgressBarMeasurementsManager>
                &measurementsManager)
        {
            ensureUnsealed();
            measurementsManager_ = measurementsManager;
        }

#pragma mark - LayoutableShadowNode

        Size RNCProgressBarShadowNode::measureContent(
            LayoutContext const &layoutContext,
            LayoutConstraints const &layoutConstraints) const
        {
            return measurementsManager_->measure(getSurfaceId(), layoutConstraints, getConcreteProps());
        }
    } // namespace react
} // namespace facebook
