export default interface StudentCreds {
    //Studenr credentials
    studentFirstName: string,
    studentLastName: string,
    studentGrade: string,
    studentSchool: string,
    studentAge: string,
    studentSex: string,
    studentEmail: string,
    studentPassword: string,
    //Parent credentials
    parent1Name: string,
    parent1Phone: string,
    parent1Email: string,
    parent1Address: string,
    parent2Name: string,
    parent2Phone: string,
    parent2Email: string,
    parent2Address: string,
    healthNotes: string,
    otherNotes: string,
    closed: boolean,
    studentUID: string,
    activeAssignments: any[],
    finishedAssignments: any[],
    teacher: boolean
}