import MyDialog from "../../../../components/Dialog";
import ThemeAutocomplete, {ThemeOptionType} from "./ThemeAutocomplete";
import Button from "@mui/material/Button";
import http from "../../../../http/http";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import * as React from "react";


function AddThemeDialog({open, onClose}) {
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState<ThemeOptionType | null>(null);

    const addThemeForUser = () => {
        if(value && value.id) {
            http.post(`/users/${user.id}/themes`, {themeId: value.id})
                .then(() => onClose())
        } else {
            http.post(`/themes`, {name: value.name})
                .then(res => {
                    http.post(`/users/${user.id}/themes`, {themeId: res.data.id})
                        .then(() => onClose())
                })
        }
    }

    const onAutocompleteChange = (event, newValue) => {
        if (typeof newValue === 'string') {
            setValue({
                name: newValue,
            });
        } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
                name: newValue.inputValue,
            });
        } else {
            setValue(newValue);
        }
    }

    return (
        <MyDialog title={"Agregar Tema"}
                  onClose={onClose}
                  open={open}
                  width={"sm"}
                  actions={
                      <>
                          <Button onClick={onClose} color={"secondary"}>
                              Cancelar
                          </Button>
                          <Button onClick={addThemeForUser} disabled={!value}>
                              Agregar
                          </Button>
                      </>
                  }
        >
            <ThemeAutocomplete onChange={onAutocompleteChange} value={value}/>
        </MyDialog>
    )
}

export default AddThemeDialog