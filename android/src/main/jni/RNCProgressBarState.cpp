#include "RNCProgressBarState.h"

namespace facebook
{
  namespace react
  {

#ifdef ANDROID
    folly::dynamic RNCProgressBarState::getDynamic() const
    {
      return folly::dynamic::object();
    }
#endif

  } // namespace react
} // namespace facebook
