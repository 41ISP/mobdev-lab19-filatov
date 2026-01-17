import{Preferences} from "@capacitor/preferences"

export const setObject = async (key,value) => {
    await Preferences.set({
        key,
        value: JSON.stringify(value)
    })
}

export const getObject = async (key) =>{
    const value = await Preferences.get({key: key})
    return JSON.parse(value.value)
}