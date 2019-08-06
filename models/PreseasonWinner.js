const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const preseasonWinnerSchema = new mongoose.Schema({
  ACCa: {
    type: String,
    ref: 'ACCa',
  },
  ACCaPoints: {
    type: Number,
    ref: 'ACCaPoints'
  },
  ACCc: {
    type: String,
    ref: 'ACCc',
  },
  ACCcPoints: {
    type: Number,
    ref: 'ACCcPoints'
  },
  ACC: {
    type: String,
    ref: 'ACC',
  },
  ACCPoints: {
    type: Number,
    ref: 'ACCPoints'
  },
  SECe: {
    type: String,
    ref: 'SECe',
  },
  SECePoints: {
    type: Number,
    ref: 'SECePoints'
  },
  SECw: {
    type: String,
    ref: 'SECw',
  },
  SECwPoints: {
    type: Number,
    ref: 'SECwPoints'
  },
  SEC: {
    type: String,
    ref: 'SEC',
  },
  SECPoints: {
    type: Number,
    ref: 'SECPoints'
  },
  Big10e: {
    type: String,
    ref: 'Big10e',
  },
  Big10ePoints: {
    type: Number,
    ref: 'Big10ePoints'
  },
  Big10w: {
    type: String,
    ref: 'Big10w',
  },
  Big10wPoints: {
    type: Number,
    ref: 'Big10wPoints'
  },
  Big10: {
    type: String,
    ref: 'Big10',
  },
  Big10Points: {
    type: Number,
    ref: 'Big10Points'
  },
  Pac12n: {
    type: String,
    ref: 'Pac12n',
  },
  Pac12nPoints: {
    type: Number,
    ref: 'Pac12nPoints'
  },
  Pac12s: {
    type: String,
    ref: 'Pac12s',
  },
  Pac12sPoints: {
    type: Number,
    ref: 'Pac12sPoints'
  },
  Pac12: {
    type: String,
    ref: 'Pac12',
  },
  Pac12Points: {
    type: Number,
    ref: 'Pac12Points'
  },
  Big12d1: {
    type: String,
    ref: 'Big12d1',
  },
  Big12d1Points: {
    type: Number,
    ref: 'Big12d1Points'
  },
  Big12d2: {
    type: String,
    ref: 'Big12d2',
  },
  Big12d2Points: {
    type: Number,
    ref: 'Big12d2Points'
  },
  Big12: {
    type: String,
    ref: 'Big12',
  },
  Big12Points: {
    type: Number,
    ref: 'Big12Points'
  },
  Playoff1: {
    type: String,
    ref: 'Playoff1',
  },
  Playoff1Points: {
    type: Number,
    ref: 'Playoff1Points'
  },
  Playoff2: {
    type: String,
    ref: 'Playoff2',
  },
  Playoff2Points: {
    type: Number,
    ref: 'Playoff2Points'
  },
  Playoff3: {
    type: String,
    ref: 'Playoff3',
  },
  Playoff3Points: {
    type: Number,
    ref: 'Playoff3Points'
  },
  Playoff4: {
    type: String,
    ref: 'Playoff4',
  },
  Playoff4Points: {
    type: Number,
    ref: 'Playoff4Points'
  },
  ChampTeam1: {
    type: String,
    ref: 'ChampTeam1',
  },
  ChampTeam1Points: {
    type: Number,
    ref: 'ChampTeam1Points'
  },
  ChampTeam2: {
    type: String,
    ref: 'ChampTeam2',
  },
  ChampTeam2Points: {
    type: Number,
    ref: 'ChampTeam2Points'
  },
  Champs: {
    type: String,
    ref: 'Champs',
  },
  ChampsPoints: {
    type: Number,
    ref: 'ChampsPoints'
  }
}, {
  toJSON: {virtuals: true },
  toObject: {virtuals: true }
});

module.exports = mongoose.model('PreseasonWinner', preseasonWinnerSchema);