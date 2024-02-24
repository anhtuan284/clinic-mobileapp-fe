import { useContext } from "react"
import { Button, Text } from "react-native"
import MyContext from "../../configs/MyContext"

const Logout = () => {
    const [user, dispatch] = useContext(MyContext);
    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    if (user===null)
        return <Text>WELCOME</Text>
    return <Button title="Đăng xuất" onPress={logout} />
}

export default Logout;