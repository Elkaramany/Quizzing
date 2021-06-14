//Validation functions:
export const nameLength = (name: string): boolean => {
    if (!name || name.length < 2) return true;
    return false;
}

export const validatestudentGrade = (grade: string): boolean => {
    if (!grade || grade.length < 1) return true;
    return false;
}

export const validatestudentSchool = (school: string): boolean => {
    if (!school || school.length < 4) return true;
    return false;
}

export const validateAge = (age: string): boolean => {
    if (!parseInt(age) || parseInt(age) <= 0 || parseInt(age) > 20) return true;
    return false;
}

export const validatestudentSex = (sex: string): boolean => {
    if (!sex || sex.length < 1) return true;
    return false;
}

export const validateEmail = (email: string): boolean => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return true;
    }
    return false;
}

export const validatePassword = (password: string): boolean => {
    if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(password)
    ) {
        return true;
    }
    return false;
}

export const validateConfirm = (cofirm: string, paswword: string): boolean => {
    if (!cofirm || cofirm.length < 5 || paswword.length < 5 || cofirm !== paswword) return true;
    return false;
}

export const validatePhone = (phone) => {
    if (!phone || phone.length < 8) return true;
    return false;
}

export const validateAddress = (address) => {
    if (!address || address.length < 6) return true;
    return false;
}

export const calculateScore = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i].correct
    }

    return total;
}

export const displayTime = (seconds) =>{
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const minutes = (seconds % 3600) / 60

    return [minutes, seconds % 60].map(format).join(':')
}

export const calculateAverage = (availableTime, usedTime, qNumber) => {
    return (availableTime - usedTime) / qNumber
}