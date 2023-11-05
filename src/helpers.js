const divideByBoss = (text) => {
  const divided = text
    .split(/\r?\n/)
    .reduce((acc, str, i, arr) => {
      const isDivider = /\/\/=+/.test(str)
      const isLast = i === arr.length - 1

      if ((isDivider && acc?.temp.length > 0) || isLast) {
        return { ...acc, lastIndex: acc.lastIndex + 1, temp: [], [acc.lastIndex]: acc.temp }
      }

      return { ...acc, temp: isDivider ? acc.temp : [...acc.temp, str] }
    }, { temp: [], lastIndex: 0 })

  delete divided.lastIndex
  delete divided.temp
  return divided
}

const formatItems = (items) => {
  return Object.values(items).map((item) => {
    const firstDividerIndex = item.findIndex(str => str === '')
    let temp = [];

    return {
      name: item[0].slice(3),
      info: item.slice(1, firstDividerIndex).map(str => str.slice(3)),
      items: item
        .slice(firstDividerIndex + 1)
        .reduce((acc, str) => {
          if (str === '') {
            const data = [...temp]
            temp = []
            return [...acc, data]
          }

          temp.push(str)
          return acc
        }, [])
        .reduce((acc, str, i) => {
          let temp = { stats: {} };
          const newS = str[0].split('", ').forEach((item, index) => {
            if (index === 0) {
              temp.NAME = item.slice(1)
              return
            }

            if (index === 1 && item.startsWith('"')) {
              temp.DESC = item.slice(1)
              return
            }

            item.split(', ').forEach(str => {
              const mod = str.split(' ')
              temp[mod[0]] = mod[1]
            })
          })

          str.slice(1).forEach(str => {
            const mod = str.split(', ')
            if (mod[0] === "IMAGE") {
              temp[mod[0]] = mod[1]
            } else {
              temp.stats[mod[0]] = mod[1]
            }
          })

          acc.push(temp)
          temp = { stats: {} };
          return acc;
        }, [])
    }
  })
}

export const parseRawItems = async () => {
  const rawData = await fetch('src/droplist.txt');
  const textData = await rawData.text();
  const splittedData = divideByBoss(textData);
  return formatItems(splittedData)
}