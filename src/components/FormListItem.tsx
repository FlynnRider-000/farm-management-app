import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {spacingBase} from '../styles';
import {useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {Badge, List, ListItem, Text} from 'native-base';
import {IList} from '../entities/form.entities';
import * as _ from 'lodash';

type IProps = {
  form: IList;
};

export const FormListItem: React.FC<IProps> = React.memo(({form}) => {
  const {pendingForms} = useSelector((state: RootState) => state.form);

  return (
    <List style={styles.outerContainer}>
      <ListItem style={styles.innerContainer}>
        <View>
          <Text>
            {
              // @ts-ignore
              form['Farm (Site Number / I.D.)']?.notes ||
              // @ts-ignore
              form['Vessel Name']?.notes ||
              form.name
            }
          </Text>
          <Text>{form.date}</Text>
        </View>
        {pendingForms.find((f) => _.isEqual(f, form)) ? (
          <Badge danger style={styles.badge} />
        ) : (
          <Badge success style={styles.badge} />
        )}
      </ListItem>
    </List>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: spacingBase,
  },
  innerContainer: {
    justifyContent: 'space-between',
    marginLeft: 0,
    alignItems: 'center',
  },
  badge: {
    width: spacingBase + 2,
    height: spacingBase + 2,
    borderRadius: spacingBase * 2,
    alignSelf: 'center',
  },
});
