import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Cadastrar from './CadastrarRefeicao';
import Alterar from './AlterarRefeicao';

const Stack = createStackNavigator();

export default function Rotas() {
    return(
        <Stack.Navigator screenOptions={({headerShown: false})}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastrar" component={Cadastrar}/>
            <Stack.Screen name="Alterar" component={Alterar} />
        </Stack.Navigator>
    );
}
