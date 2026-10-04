/**
 * SGPA solver: find exact grade assignments per semester
 * Prints the correct grade arrays to use in the fix script.
 */

const gradePoints = { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5 };
const grades = ['S', 'A', 'B', 'C', 'D', 'E'];

function findBestGrades(credits, targetSGPA) {
    const filteredCredits = credits.filter(c => c > 0);
    const totalCredits = filteredCredits.reduce((a, b) => a + b, 0);
    let bestDiff = Infinity;
    let bestCombination = null;

    function search(index, combo, currentSum) {
        if (index === filteredCredits.length) {
            const sgpa = currentSum / totalCredits;
            const diff = Math.abs(sgpa - targetSGPA);
            if (diff < bestDiff) {
                bestDiff = diff;
                bestCombination = [...combo];
            }
            return;
        }
        for (const g of grades) {
            combo.push(g);
            search(index + 1, combo, currentSum + filteredCredits[index] * gradePoints[g]);
            combo.pop();
            if (bestDiff === 0) return;
        }
    }
    search(0, [], 0);

    // Map back (credit=0 gets 'A')
    let ci = 0;
    return credits.map(c => (c > 0 ? bestCombination[ci++] : 'A'));
}

const semesters = [
    {
        key: 'student_odd_2023', sgpa: 7.13,
        subjects: [
            { name: 'ENGINEERING MECHANICS', credit: 4 },
            { name: 'PHYSICS', credit: 4 },
            { name: 'MATHEMATICS I', credit: 4 },
            { name: 'HUMANITIES &SOCIOLOGY', credit: 2 },
            { name: 'CHEMISTRY', credit: 4 }
        ]
    },
    {
        key: 'student_even_2023', sgpa: 7.52,
        subjects: [
            { name: 'BASIC ELECTRONICS', credit: 4 },
            { name: 'MATHEMATICS II', credit: 4 },
            { name: 'BASIC ELECTRICAL ENGINEERING', credit: 4 },
            { name: 'COMPUTER PROGRAMMING & NUMERICAL METHODS', credit: 4 },
            { name: 'COMPUTER PROGRAMMING & NUMERICAL METHODS (PRACTICAL)', credit: 2 },
            { name: 'ELECTRICAL & ELECTRONICS LABORATORY (PRACTICAL)', credit: 2 },
            { name: 'ENGINEERING DRAWING (PRACTICAL)', credit: 2 }
        ]
    },
    {
        key: 'student_odd_2024', sgpa: 7.88,
        subjects: [
            { name: 'STRENGTH OF MATERIALS', credit: 4 },
            { name: 'MECHANICS OF FLUID', credit: 4 },
            { name: 'MATHEMATICS-III', credit: 4 },
            { name: 'CHEMICAL PROCESS PRINCIPLES', credit: 4 },
            { name: 'PHYSICAL CHEMISTRY', credit: 4 },
            { name: 'ENGINEERING THERMODYNAMICS', credit: 4 }
        ]
    },
    {
        key: 'student_even_2024', sgpa: 8.12,
        subjects: [
            { name: 'MECHANICAL OPERATIONS', credit: 4 },
            { name: 'CHEMICAL ENGINEERING THERMODYNAMICS', credit: 4 },
            { name: 'NUMERICAL ANALYSIS FOR CHEMICAL ENGINEERS', credit: 4 },
            { name: 'MACHINE DESIGN', credit: 4 },
            { name: 'INTRODUCTION TO TRANSPORT PHENOMENA', credit: 4 },
            { name: 'MATERIAL SCIENCE &ENGINEERING', credit: 4 }
        ]
    },
    {
        key: 'student_odd_2025', sgpa: 8.45,
        subjects: [
            { name: 'CHEMICAL REACTION ENGINEERING-I', credit: 4 },
            { name: 'CHEMICAL TECHNOLOGY-I', credit: 4 },
            { name: 'SEPARATION PROCESSES - I', credit: 4 },
            { name: 'PROCESS HEAT TRANSFER', credit: 4 },
            { name: 'DATABASE MANAGEMENT SYSTEMS BASICS', credit: 3 }
        ]
    },
    {
        key: 'student_even_2025', sgpa: 8.65,
        subjects: [
            { name: 'CHEMICAL TECHNOLOGY- II', credit: 4 },
            { name: 'PROCESS DYNAMICS &CONTROL', credit: 4 },
            { name: 'MATHEMATICAL MODELLING IN CHEMICAL ENGG.', credit: 4 },
            { name: 'SEPARATION PROCESSES- II', credit: 4 },
            { name: 'PRINCIPLES OF MEASUREMENTS & INSTRUMENTATION', credit: 4 },
            { name: 'CHEMICAL REACTION ENGINEERING- II', credit: 4 }
        ]
    }
];

console.log('Optimal grade assignments:\n');
for (const sem of semesters) {
    const credits = sem.subjects.map(s => s.credit);
    const gradeAssign = findBestGrades(credits, sem.sgpa);
    const totalCredits = credits.reduce((a, b) => a + b, 0);
    const totalPoints = gradeAssign.reduce((acc, g, i) => acc + credits[i] * (gradePoints[g] || 0), 0);
    const computedSGPA = (totalPoints / totalCredits).toFixed(4);
    console.log(`${sem.key} (target ${sem.sgpa}, computed ${computedSGPA}):`);
    sem.subjects.forEach((s, i) => {
        console.log(`  ${s.name}: credit=${s.credit}, grade=${gradeAssign[i]}`);
    });
    console.log('');
}
