import * as React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {spacingBase} from '../styles';
import {
  AssessmentReport,
  DebrisReport,
  FloatReport,
  ChecklistReport,
  SpotterForm,
  FeedbackForm,
} from '../components';
import {useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {MainScreenNavigationProp} from '../entities/general';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const Report: React.FC<TProps> = ({navigation}) => {
  const {currentForm} = useSelector((state: RootState) => state.form);

  return (
    <KeyboardAvoidingView
      // @ts-ignore
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={-5}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.outerContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.formContainer}>
            {(currentForm === 'checklist' || currentForm === 'compliant') && (
              <ChecklistReport navigation={navigation} />
            )}
            {currentForm === 'float' && (
              <FloatReport navigation={navigation} />
            )}
            {currentForm === 'spotter' && (
              <SpotterForm navigation={navigation} />
            )}
            {currentForm === 'feedback' && (
              <FeedbackForm navigation={navigation} />
            )}
            {currentForm === 'assessment' && (
              <AssessmentReport navigation={navigation} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: spacingBase * 3,
  },
  formContainer: {flex: 1, paddingHorizontal: spacingBase + 5},
  formInputInnerStyles: {
    flex: 1,
    marginLeft: 0,
  },
});
