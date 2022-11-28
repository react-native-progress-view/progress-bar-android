#include "RNCProgressBarMeasurementsManager.h"

#include <fbjni/fbjni.h>
#include <react/renderer/core/conversions.h>
#include <react/renderer/components/view/conversions.h>
#include <react/jni/ReadableNativeMap.h>

using namespace facebook::jni;

namespace facebook
{
  namespace react
  {
    // Based on react-native/ReactCommon/react/renderer/components/switch/androidswitch/react/renderer/components/androidswitch/AndroidSwitchMeasurementsManager.cpp
    // This class is shared between the shadow nodes and allows us to measure the progress bar.
    // It calls the measure method of the ReactProgressBarViewManager.java which is responsible for the actual
    // measurement of the progress bar.
    Size RNCProgressBarMeasurementsManager::measure(
        SurfaceId surfaceId,
        LayoutConstraints layoutConstraints,
        RNCProgressBarProps props) const
    {
      {
        std::lock_guard<std::mutex> lock(mutex_);
        if (cachedMeasurements_.find(props.styleAttr) != cachedMeasurements_.end())
        {
          return cachedMeasurements_[props.styleAttr];
        }
      }

      const jni::global_ref<jobject> &fabricUIManager =
          contextContainer_->at<jni::global_ref<jobject>>("FabricUIManager");

      static auto measure =
          jni::findClassStatic("com/facebook/react/fabric/FabricUIManager")
              ->getMethod<jlong(
                  jint,
                  jstring,
                  ReadableMap::javaobject,
                  ReadableMap::javaobject,
                  ReadableMap::javaobject,
                  jfloat,
                  jfloat,
                  jfloat,
                  jfloat)>("measure");

      auto minimumSize = layoutConstraints.minimumSize;
      auto maximumSize = layoutConstraints.maximumSize;

      local_ref<JString> componentName = make_jstring("RNCProgressBar");

      folly::dynamic serializedProps = folly::dynamic::object();
      serializedProps["styleAttr"] = props.styleAttr;

      local_ref<ReadableNativeMap::javaobject> propsRNM =
          ReadableNativeMap::newObjectCxxArgs(serializedProps);
      local_ref<ReadableMap::javaobject> propsRM =
          make_local(reinterpret_cast<ReadableMap::javaobject>(propsRNM.get()));

      auto measurement = yogaMeassureToSize(measure(
          fabricUIManager,
          surfaceId,
          componentName.get(),
          nullptr,
          propsRM.get(),
          nullptr,
          minimumSize.width,
          maximumSize.width,
          minimumSize.height,
          maximumSize.height));

      std::lock_guard<std::mutex> lock(mutex_);
      cachedMeasurements_[props.styleAttr] = measurement;
      return measurement;
    }

  } // namespace react
} // namespace facebook
