export default class DoctorView {
    constructor() {
        this.dropDown = document.getElementById('doctors');
    }
    setDoctors(data) {
        for (let i = 0; i < data.length; i++) {
            const opt = document.createElement('option');
            opt.value = data[i].name;
            opt.innerHTML = data[i].name;
            this.dropDown.appendChild(opt);
        }
    }
}