import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import http from "../../../../http/http";

export interface ThemeOptionType {
    id?: string;
    name:string;
    inputValue?: string;
}

const filter = createFilterOptions<ThemeOptionType>();

export default function ThemeAutocomplete({onChange, value}) {
    const [themes, setThemes] = useState<ThemeOptionType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        http.get(`/themes`)
            .then(res => {
                setThemes(res.data)
                setLoading(false)
            })
    }, [])

    return (
        <Autocomplete
            value={value}
            loading={loading}
            onChange={onChange}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Agregar "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={themes}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Buscar Tema" />
            )}
        />
    );
}
