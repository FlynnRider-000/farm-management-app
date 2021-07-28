import * as React from 'react';
import {
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {spacingBase} from '../styles';
import {
  Icon,
  Input,
  Item,
  Label,
  Left,
  ListItem,
  Right,
  Text,
} from 'native-base';
import {IFarm} from '../entities/general';

const windowHeight = Dimensions.get('window').height;

type TProps = {
  visible: boolean;
  allPoints: Array<IFarm>;
  handleSearchChange: (type: string) => (text: string) => void;
  setFarm: (item: IFarm) => void;
  type?: string;
};

export const FarmModal: React.FC<TProps> = React.memo(
  ({visible, allPoints, handleSearchChange, setFarm, type}) => {
    return (
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle={'overFullScreen'}>
        <SafeAreaView style={styles.outerContainer}>
          <Item floatingLabel style={styles.inputContainer}>
            <Label>{`Search ${type || 'farm'}`}</Label>
            <Input
              onChangeText={(text) => handleSearchChange(type || 'farm')(text)}
            />
          </Item>
          <ScrollView style={{paddingBottom: spacingBase * 2}}>
            {allPoints?.length > 0 &&
              allPoints
                .map((item, i) => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => setFarm(item)}
                      key={new Date().getTime() * i}>
                      <ListItem style={styles.listItem}>
                        <Left>
                          <Text>{item.name}</Text>
                        </Left>
                        <Right>
                          <Icon name="arrow-forward" />
                        </Right>
                      </ListItem>
                    </TouchableWithoutFeedback>
                  );
                })
                .slice(0, 12)}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: spacingBase * 3,
    marginTop: spacingBase * 3,
  },
  outerContainer: {
    marginHorizontal: spacingBase + 5,
    height: windowHeight,
  },
  listItem: {
    flexDirection: 'row',
    paddingRight: 0,
    marginLeft: 0,
  },
});
