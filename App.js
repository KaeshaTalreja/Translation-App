//document for translation help
//https://docs.expo.dev/versions/latest/sdk/localization

import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker, //dropdown list component for displaying available language support in the app
} from 'react-native';

//the list of languages (in json file format) to load in picker
import Languages from './languages.json';

//step 1: modules used
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

//step 2: support for different languages and the translation for each word in respective language (in json format)

//English
const en = {
  hello: 'hello',
  welcome: 'welcome',
};

//French
const fr = {
  hello: 'bonjour',
  welcome: 'Bienvenue',
};

//Spanish
const es = {
  hello: 'hola',
  welcome: 'bienvenida',
};

//Arabic
const ar = {
  hello: 'أهلا',
  welcome: 'أهلا بك',
};

//Dutch
const nl = {
  hello: 'Hallo',
  welcome: 'welkom',
};

//German
const de = {
  hello: 'Hallo',
  welcome: 'willkommen',
};

//Greek
const el = {
  hello: 'γεια σας',
  welcome: 'καλως ΗΡΘΑΤΕ',
};

//Hindi
const hi = {
  hello: 'नमस्ते',
  welcome: 'स्वागत हे',
};

//step 3: register the translation languages
i18n.translations = { fr, en, es, ar, nl, de, el, hi };

//step 4: set the preference of language. By default it is English
i18n.locale = 'en';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textByUser: '',
      translatedText: '',
    };
  }

  translate = () => {
    //step 5:instruction to translate: i18n.t(word_to_translate)
    this.setState({ translatedText: i18n.t(this.state.textByUser) });
  };

  render() {
    return (
      <View
        style={{
          flex: 1.0,
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 2,
            margin: 10,
            width: 200,
          }}
          placeholder="Enter Message to translate"
          onChangeText={(text) => {
            this.setState({ textByUser: text });
          }}
          value={this.state.textByUser}
        />

        <Picker
          onValueChange={(lang) => {
            //console.log(lang);
            i18n.locale = lang;
          }}>
          {Object.keys(Languages).map((key) => (
            <Picker.Item label={Languages[key]} value={key} />
          ))}
        </Picker>

        <TouchableOpacity
          style={{
            margin: 20,
            backgroundColor: 'blue',
            alignSelf: 'center',
            height: 30,
            width: 100,
            justifyContent: 'center',
          }}
          onPress={this.translate}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
            }}>
            Translate
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderWidth: 4,
            alignSelf: 'center',
            borderColor:'aqua'
          }}>
          <Text
            style={{
              margin: 10,
              color: 'green',
              fontWeight: 'bolder',
            }}>
            Translated Message: {'\n' + this.state.translatedText}
          </Text>
        </View>
        <View
          style={{
            margin: 30,
            alignSelf: 'justify',
          }}>
          <Text
            style={{
              margin: 10,
              fontWeight: 'bolder',
            }}>
            Localization/Device details
          </Text>
          <Text>Timezone: {Localization.timezone}</Text>
          <Text>Locale: {Localization.locale}</Text>
          <Text>Region: {Localization.region}</Text>
        </View>
      </View>
    );
  }
}
