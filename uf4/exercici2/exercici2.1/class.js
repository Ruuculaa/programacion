class Persona {
  constructor(nom, cognom, DNI) {
    this.nom = nom;
    this.cognom = cognom;
    this.DNI = DNI;
  }

  getNom() {
    return this.nom;
  }

  getCognom() {
    return this.cognom;
  }

  getDNI() {
    return this.DNI;
  }
}

class Professor extends Persona {
  constructor(nom, cognom, DNI, especialitat) {
    super(nom, cognom, DNI);
    this.especialitat = especialitat;
    this.assignatures = [];
  }

  afegirAssignatura(assignatura) {
    this.assignatures.push(new Assignatura(assignatura.nom, assignatura.codi));
  }

  eliminarAssignatura(assignatura) {
    this.assignatures = this.assignatures.filter(a => a !== assignatura);
  }

  getEspecialitat() {
    return this.especialitat;
  }

  getAssignatures() {
    return this.assignatures;
  }
}

class Alumne extends Persona {
  constructor(nom, cognom, DNI, curs, grup) {
    super(nom, cognom, DNI);
    this.curs = curs;
    this.grup = grup;
  }

  setCurs(curs) {
    this.curs = curs;
  }

  setGrup(grup) {
    this.grup = grup;
  }

  getCurs() {
    return this.curs;
  }

  getGrup() {
    return this.grup;
  }
}

class Aula {
  constructor(numAula, capacitat) {
    this.numAula = numAula;
    this.capacitat = capacitat;
  }

  getNumAula() {
    return this.numAula;
  }

  getCapacitat() {
    return this.capacitat;
  }
}

class Assignatura {
  constructor(nom, codi, horari, grup) {
    this.nom = nom;
    this.codi = codi;
    this.horari = horari;
    this.grup = grup;
  }

  getNom() {
    return this.nom;
  }

  getCodi() {
    return this.codi;
  }

  getHorari() {
    return this.horari;
  }

  getGrup() {
    return this.grup;
  }
}

class Grup {
  constructor(numGrup) {
    this.numGrup = numGrup;
    this.alumnes = [];
  }

  afegirAlumne(alumne) {
    this.alumnes.push(alumne);
  }

  eliminarAlumne(alumne) {
    this.alumnes = this.alumnes.filter(a => a !== alumne);
  }

  getNumGrup() {
    return this.numGrup;
  }

  getAlumnes() {
    return this.alumnes;
  }
}

class Horari {
  constructor() {
    this.diesSetmana = new Map();
  }

  afegirHora(dia, hora) {
    if (!this.diesSetmana.has(dia)) {
      this.diesSetmana.set(dia, []);
    }
    this.diesSetmana.get(dia).push(hora);
  }

  eliminarHora(dia, hora) {
    if (this.diesSetmana.has(dia)) {
      this.diesSetmana.set(dia, this.diesSetmana.get(dia).filter(h => h !==hora));
}
}

getDiesSetmana() {
return this.diesSetmana;
}
}

class Hora {
	constructor(horaInici, horaFi, professor, assignatura, aula) {
		this.horaInici = horaInici;
		this.horaFi = horaFi;
		this.professor = professor;
		this.assignatura = assignatura;
		this.aula = aula;
	}

	getHoraInici() {
		return this.horaInici;
	}

	getHoraFi() {
		return this.horaFi;
	}

	getProfessor() {
		return this.professor;
	}

	getAssignatura() {
		return this.assignatura;
	}

	getAula() {
		return this.aula;
	}
}

