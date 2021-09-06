import * as React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Heading,
  ArrowBackIcon,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {spacingBase, light} from '../styles';
import {
  AssessmentReport,
  HarvestReport,
} from '../components';
import {RootState} from '../store/rootReducer';
import {MainScreenNavigationProp} from '../entities/general';
import {setEditForm} from '../store/actions/form.actions';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const Report: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const {currentForm, editForm} = useSelector((state: RootState) => state.form);
  let heading = '';

  if (currentForm === 'assessment') {
    heading = 'Mussel Farm Assessment';
  }
  if (currentForm === 'harvest') {
    heading = 'Mussel Harvest Declaration';
  }

  return (
    <KeyboardAvoidingView
      // @ts-ignore
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={-5}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <TouchableWithoutFeedback
          style={{backgroundColor: 'white'}}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.formContainer}>
            <View style={styles.topBarContainer}>
              <TouchableOpacity onPress={async () => {
                if (editForm) {
                  await dispatch(setEditForm(null));
                }
                navigation.goBack();
              }}>
                <View style={styles.buttonWrap}>
                  <ArrowBackIcon size={6}/>
                </View>
              </TouchableOpacity>
              <Heading size="sm" style={{flex: 1, paddingLeft: spacingBase * 3}}>
                {heading}
              </Heading>
            </View>
            {currentForm === 'assessment' && (
              <AssessmentReport navigation={navigation} />
            )}
            {currentForm === 'harvest' && (
              <HarvestReport navigation={navigation} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {flex: 1},
  formInputInnerStyles: {
    flex: 1,
    marginLeft: 0,
  },
  buttonWrap: {
    borderRadius: spacingBase * 1.5,
    borderWidth: 1,
    borderColor: light,
    padding: spacingBase * 0.5,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: spacingBase * 2,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 1,
    elevation: 10,
  }
});
