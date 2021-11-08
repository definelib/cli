

module.exports = {
    fix(line, { quote, name, }) {
        let regexp = /\s+module.require\s*\(\s*["']\S+["']\)?/g;
        let list = line.match(regexp);

        if (!list) {
            return line;
        }

        let s0 = `module.require(${quote}`;
        let s1 = `require(${quote}./${name}/`;

        line = line.replace(s0, s1);

        return line;
    },

   
};