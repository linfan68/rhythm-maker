
function createPatterns(n: number) {
  const max = Math.pow(2, n)
  return Array(max).fill(0)
  .map((v, idx) => {
    return idx.toString(2).padStart(n, '0')
  })
}

function countRepeat(p: string, win: number) {
  let chunks = Array(p.length / win).fill(0)
    .map((v, i) => i).map(i => i* win)
    .map(c => p.substr(c, win))
  let repeatCount = 0
  while (win > 2) {
    repeatCount += chunks.map(c => c.substr(0, win)).filter((v, i, s) => s.indexOf(v) === i).length
    win--
  }

  return repeatCount
}
function scorePattern(p: string) {
  let score = 0;
  const win = [4, 2]
  win.forEach(r => {
    score += (r - 1) * countRepeat(p, r)
  })
  const sp = p.split('')
  const sp1 = p.split('')
  sp1.shift()
  sp1!.forEach((s, i) => {
    score += s === sp[i] ? 0 : 1
  })

  return score
}
if (!module.parent) {
  const patterns = createPatterns(8)
  const pp = patterns.map(p => {
    return {
      p: p,
      s: scorePattern(p)
    }
  })
  pp.sort((a, b) => a.s - b.s).reverse()
  console.log(pp.map(pp => `${pp.p} : ${pp.s.toString().padStart(2, ' ')}`).join('\n'))
  console.log(pp.length)
}