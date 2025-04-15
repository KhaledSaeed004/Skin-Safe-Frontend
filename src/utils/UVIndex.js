export function UVIndexRiskLevel(uvIndex) {
    return uvIndex < 3 ?
        "Low" :
        uvIndex < 6 ?
        "Moderate" :
        uvIndex < 8 ?
        "High" :
        uvIndex < 11 ?
        "Very High" :
        "Extreme";
}

export function UVIndexColor(uvIndex) {
    return uvIndex < 3 ?
        "#00E400" :
        uvIndex < 6 ?
        "#FFFF00" :
        uvIndex < 8 ?
        "#FF7E00" :
        uvIndex < 11 ?
        "#FF0000" :
        "#000000";
}