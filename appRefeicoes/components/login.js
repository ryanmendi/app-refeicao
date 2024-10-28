import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../firebase"; 

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState(null); 

    // Função para logar o usuário
    function logar() {
        signInWithEmailAndPassword(auth, email, senha) 
            .then(() => {
                
                navigation.navigate('Rotas', { email });
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => { 
            if (user) {
                setUser(user);
                navigation.navigate('Rotas', { email: user.email });
            } else {
                setUser(null);
            }
        });
        return unsubscribe; 
    }, [navigation]); 

    return (
        <View style={estilo.container}>
            <Text style={estilo.titulo}>Login</Text>
            <TextInput
                style={estilo.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Digite o email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={estilo.input}
                secureTextEntry={true} 
                onChangeText={setSenha} 
                value={senha}
                placeholder="Digite a senha"
            />
            <TouchableOpacity style={estilo.botaoLogar} onPress={logar}>
                <Text style={estilo.textoBotaoLogar}>Logar</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#116611',
    },
    titulo: {
        fontSize: 50,
        marginBottom: 20, 
    },
    input: {
        width: 250,
        height: 40, 
        backgroundColor: '#5f5c',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 20,
    },
    botaoLogar: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textoBotaoLogar: {
        fontSize: 25
    }
});
