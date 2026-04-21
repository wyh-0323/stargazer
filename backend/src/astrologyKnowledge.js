const astrologyKnowledge = {
  planets: {
    sun: {
      name: '太阳',
      description: '代表自我、个性、生命力和核心身份',
      signs: {
        aries: '太阳在白羊座：充满活力、自信、领导力，喜欢冒险和挑战',
        taurus: '太阳在金牛座：稳定、务实、享受生活，重视物质和安全感',
        gemini: '太阳在双子座：好奇、善变、善于沟通，喜欢学习和社交',
        cancer: '太阳在巨蟹座：情感丰富、敏感、重视家庭，有强烈的保护欲',
        leo: '太阳在狮子座：自信、热情、慷慨，喜欢成为焦点',
        virgo: '太阳在处女座：细致、分析能力强、注重细节，追求完美',
        libra: '太阳在天秤座：和谐、平衡、公正，注重关系和美感',
        scorpio: '太阳在天蝎座：深刻、热情、直觉强，有强烈的情感和洞察力',
        sagittarius: '太阳在射手座：乐观、自由、喜欢探索，有哲学思维',
        capricorn: '太阳在摩羯座：务实、有责任感、有野心，追求成就',
        aquarius: '太阳在水瓶座：独立、创新、人道，重视自由和进步',
        pisces: '太阳在双鱼座：敏感、直觉、富有想象力，有同情心'
      }
    },
    moon: {
      name: '月亮',
      description: '代表情感、情绪、潜意识和内在需求',
      signs: {
        aries: '月亮在白羊座：情感冲动、直接，需要表达和行动',
        taurus: '月亮在金牛座：情感稳定、踏实，需要安全感和舒适',
        gemini: '月亮在双子座：情感多变、好奇，需要沟通和刺激',
        cancer: '月亮在巨蟹座：情感深刻、敏感，需要家庭和情感连接',
        leo: '月亮在狮子座：情感热情、骄傲，需要被认可和关注',
        virgo: '月亮在处女座：情感细腻、分析，需要秩序和服务',
        libra: '月亮在天秤座：情感和谐、平衡，需要关系和美感',
        scorpio: '月亮在天蝎座：情感强烈、深刻，需要深度和忠诚',
        sagittarius: '月亮在射手座：情感乐观、自由，需要探索和意义',
        capricorn: '月亮在摩羯座：情感克制、实际，需要成就和安全感',
        aquarius: '月亮在水瓶座：情感独立、理性，需要自由和独特性',
        pisces: '月亮在双鱼座：情感敏感、直觉，需要同情和灵性'
      }
    },
    mercury: {
      name: '水星',
      description: '代表思维、沟通、学习和信息处理',
      signs: {
        aries: '水星在白羊座：思维直接、快速，喜欢争论和创新',
        taurus: '水星在金牛座：思维实际、固执，喜欢具体和实用的信息',
        gemini: '水星在双子座：思维敏捷、多才多艺，喜欢多样化的信息',
        cancer: '水星在巨蟹座：思维情感化、直觉，喜欢回忆和家庭相关的话题',
        leo: '水星在狮子座：思维自信、戏剧化，喜欢表达和领导',
        virgo: '水星在处女座：思维细致、分析，喜欢细节和精确',
        libra: '水星在天秤座：思维平衡、公正，喜欢和谐和关系',
        scorpio: '水星在天蝎座：思维深刻、直觉，喜欢探索和发现',
        sagittarius: '水星在射手座：思维广阔、哲学，喜欢探索和冒险',
        capricorn: '水星在摩羯座：思维实际、有条理，喜欢结构和成就',
        aquarius: '水星在水瓶座：思维创新、客观，喜欢进步和科技',
        pisces: '水星在双鱼座：思维直觉、模糊，喜欢想象和灵性'
      }
    },
    venus: {
      name: '金星',
      description: '代表爱情、美感、关系和价值观',
      signs: {
        aries: '金星在白羊座：爱情直接、热情，喜欢挑战和竞争',
        taurus: '金星在金牛座：爱情稳定、感官，喜欢舒适和物质享受',
        gemini: '金星在双子座：爱情多变、有趣，喜欢沟通和社交',
        cancer: '金星在巨蟹座：爱情情感、保护，喜欢家庭和安全感',
        leo: '金星在狮子座：爱情浪漫、戏剧化，喜欢被关注和赞赏',
        virgo: '金星在处女座：爱情实用、细致，喜欢服务和完美',
        libra: '金星在天秤座：爱情和谐、平衡，喜欢美感和关系',
        scorpio: '金星在天蝎座：爱情深刻、占有，喜欢intensity和忠诚',
        sagittarius: '金星在射手座：爱情自由、乐观，喜欢冒险和探索',
        capricorn: '金星在摩羯座：爱情实际、负责任，喜欢成就和稳定',
        aquarius: '金星在水瓶座：爱情独立、友好，喜欢独特和创新',
        pisces: '金星在双鱼座：爱情梦幻、同情，喜欢灵性和想象'
      }
    },
    mars: {
      name: '火星',
      description: '代表行动、能量、欲望和勇气',
      signs: {
        aries: '火星在白羊座：行动直接、冲动，喜欢竞争和挑战',
        taurus: '火星在金牛座：行动缓慢、持久，喜欢稳定和实际',
        gemini: '火星在双子座：行动多变、好奇，喜欢沟通和多样性',
        cancer: '火星在巨蟹座：行动情感化、保护，喜欢家庭和安全',
        leo: '火星在狮子座：行动自信、戏剧化，喜欢领导和表现',
        virgo: '火星在处女座：行动细致、分析，喜欢服务和完美',
        libra: '火星在天秤座：行动平衡、公正，喜欢和谐和关系',
        scorpio: '火星在天蝎座：行动深刻、强烈，喜欢intensity和转化',
        sagittarius: '火星在射手座：行动自由、乐观，喜欢探索和冒险',
        capricorn: '火星在摩羯座：行动实际、有计划，喜欢成就和结构',
        aquarius: '火星在水瓶座：行动创新、独立，喜欢进步和科技',
        pisces: '火星在双鱼座：行动直觉、梦幻，喜欢灵性和想象'
      }
    },
    jupiter: {
      name: '木星',
      description: '代表扩张、幸运、哲学和成长',
      signs: {
        aries: '木星在白羊座：扩张通过行动和冒险，喜欢新开始',
        taurus: '木星在金牛座：扩张通过物质和稳定，喜欢享受和积累',
        gemini: '木星在双子座：扩张通过沟通和学习，喜欢多样性',
        cancer: '木星在巨蟹座：扩张通过家庭和情感，喜欢安全感',
        leo: '木星在狮子座：扩张通过创造力和领导，喜欢表现',
        virgo: '木星在处女座：扩张通过服务和完美，喜欢细节',
        libra: '木星在天秤座：扩张通过关系和和谐，喜欢美感',
        scorpio: '木星在天蝎座：扩张通过深度和转化，喜欢探索',
        sagittarius: '木星在射手座：扩张通过哲学和冒险，喜欢自由',
        capricorn: '木星在摩羯座：扩张通过成就和结构，喜欢责任',
        aquarius: '木星在水瓶座：扩张通过创新和人道，喜欢进步',
        pisces: '木星在双鱼座：扩张通过灵性和想象，喜欢同情'
      }
    },
    saturn: {
      name: '土星',
      description: '代表责任、限制、结构和成熟',
      signs: {
        aries: '土星在白羊座：责任通过自我发展和勇气，需要平衡行动',
        taurus: '土星在金牛座：责任通过物质和稳定，需要平衡占有',
        gemini: '土星在双子座：责任通过沟通和学习，需要平衡信息',
        cancer: '土星在巨蟹座：责任通过家庭和情感，需要平衡安全感',
        leo: '土星在狮子座：责任通过创造力和领导，需要平衡自我',
        virgo: '土星在处女座：责任通过服务和完美，需要平衡细节',
        libra: '土星在天秤座：责任通过关系和和谐，需要平衡公正',
        scorpio: '土星在天蝎座：责任通过深度和转化，需要平衡intensity',
        sagittarius: '土星在射手座：责任通过哲学和冒险，需要平衡自由',
        capricorn: '土星在摩羯座：责任通过成就和结构，需要平衡野心',
        aquarius: '土星在水瓶座：责任通过创新和人道，需要平衡独立',
        pisces: '土星在双鱼座：责任通过灵性和想象，需要平衡直觉'
      }
    },
    uranus: {
      name: '天王星',
      description: '代表创新、变革、独立和突破',
      signs: {
        aries: '天王星在白羊座：创新通过个人行动和勇气，喜欢突破',
        taurus: '天王星在金牛座：创新通过物质和稳定，喜欢变革价值',
        gemini: '天王星在双子座：创新通过沟通和学习，喜欢信息革命',
        cancer: '天王星在巨蟹座：创新通过家庭和情感，喜欢变革安全感',
        leo: '天王星在狮子座：创新通过自我表达和领导，喜欢独特性',
        virgo: '天王星在处女座：创新通过服务和健康，喜欢变革系统',
        libra: '天王星在天秤座：创新通过关系和和谐，喜欢变革公正',
        scorpio: '天王星在天蝎座：创新通过深度和转化，喜欢变革能量',
        sagittarius: '天王星在射手座：创新通过哲学和冒险，喜欢变革信念',
        capricorn: '天王星在摩羯座：创新通过结构和成就，喜欢变革系统',
        aquarius: '天王星在水瓶座：创新通过科技和人道，喜欢变革社会',
        pisces: '天王星在双鱼座：创新通过灵性和想象，喜欢变革意识'
      }
    },
    neptune: {
      name: '海王星',
      description: '代表直觉、梦幻、灵性和超越',
      signs: {
        aries: '海王星在白羊座：直觉通过个人行动，喜欢灵性冒险',
        taurus: '海王星在金牛座：直觉通过物质和感官，喜欢灵性美感',
        gemini: '海王星在双子座：直觉通过沟通和学习，喜欢灵性信息',
        cancer: '海王星在巨蟹座：直觉通过情感和家庭，喜欢灵性安全',
        leo: '海王星在狮子座：直觉通过自我表达，喜欢灵性创造',
        virgo: '海王星在处女座：直觉通过服务和健康，喜欢灵性细节',
        libra: '海王星在天秤座：直觉通过关系和和谐，喜欢灵性平衡',
        scorpio: '海王星在天蝎座：直觉通过深度和转化，喜欢灵性重生',
        sagittarius: '海王星在射手座：直觉通过哲学和冒险，喜欢灵性探索',
        capricorn: '海王星在摩羯座：直觉通过结构和成就，喜欢灵性责任',
        aquarius: '海王星在水瓶座：直觉通过科技和人道，喜欢灵性创新',
        pisces: '海王星在双鱼座：直觉通过灵性和想象，喜欢灵性超越'
      }
    },
    pluto: {
      name: '冥王星',
      description: '代表转化、力量、深度和重生',
      signs: {
        aries: '冥王星在白羊座：转化通过个人行动和勇气，喜欢力量突破',
        taurus: '冥王星在金牛座：转化通过物质和稳定，喜欢力量积累',
        gemini: '冥王星在双子座：转化通过沟通和学习，喜欢力量信息',
        cancer: '冥王星在巨蟹座：转化通过情感和家庭，喜欢力量安全',
        leo: '冥王星在狮子座：转化通过自我表达和领导，喜欢力量创造',
        virgo: '冥王星在处女座：转化通过服务和健康，喜欢力量细节',
        libra: '冥王星在天秤座：转化通过关系和和谐，喜欢力量平衡',
        scorpio: '冥王星在天蝎座：转化通过深度和重生，喜欢力量intensity',
        sagittarius: '冥王星在射手座：转化通过哲学和冒险，喜欢力量信念',
        capricorn: '冥王星在摩羯座：转化通过结构和成就，喜欢力量系统',
        aquarius: '冥王星在水瓶座：转化通过科技和人道，喜欢力量创新',
        pisces: '冥王星在双鱼座：转化通过灵性和想象，喜欢力量超越'
      }
    }
  },
  houses: {
    1: { name: '第一宫', description: '代表自我、个性、外表和开始', keywords: ['自我认同', '个人形象', '初始反应', '人生方向'] },
    2: { name: '第二宫', description: '代表物质、财富、价值观和安全感', keywords: ['金钱', '财产', '价值观', '安全感'] },
    3: { name: '第三宫', description: '代表沟通、学习、兄弟姐妹和短途旅行', keywords: ['沟通', '学习', '兄弟姐妹', '短途旅行'] },
    4: { name: '第四宫', description: '代表家庭、根、情感基础和晚年', keywords: ['家庭', '根源', '情感基础', '晚年'] },
    5: { name: '第五宫', description: '代表创造力、爱情、娱乐和子女', keywords: ['创造力', '爱情', '娱乐', '子女'] },
    6: { name: '第六宫', description: '代表工作、健康、服务和日常事务', keywords: ['工作', '健康', '服务', '日常事务'] },
    7: { name: '第七宫', description: '代表关系、婚姻、合作和敌人', keywords: ['关系', '婚姻', '合作', '敌人'] },
    8: { name: '第八宫', description: '代表深度、转化、共享资源和性', keywords: ['深度', '转化', '共享资源', '性'] },
    9: { name: '第九宫', description: '代表哲学、高等教育、长途旅行和信仰', keywords: ['哲学', '高等教育', '长途旅行', '信仰'] },
    10: { name: '第十宫', description: '代表事业、声誉、社会地位和父亲', keywords: ['事业', '声誉', '社会地位', '父亲'] },
    11: { name: '第十一宫', description: '代表朋友、团体、希望和理想', keywords: ['朋友', '团体', '希望', '理想'] },
    12: { name: '第十二宫', description: '代表潜意识、灵性、牺牲和隐藏的事物', keywords: ['潜意识', '灵性', '牺牲', '隐藏的事物'] }
  },
  aspects: {
    conjunction: { name: '合相', description: '行星能量融合，加强彼此的影响', orb: 8 },
    sextile: { name: '六分相', description: '行星能量和谐，提供机会和支持', orb: 6 },
    square: { name: '四分相', description: '行星能量冲突，带来挑战和成长', orb: 8 },
    trine: { name: '三分相', description: '行星能量和谐，带来天赋和优势', orb: 8 },
    opposition: { name: '对分相', description: '行星能量对立，需要平衡和整合', orb: 8 }
  },
  ascendant: {
    aries: '上升白羊座：外表充满活力，直接，喜欢冒险',
    taurus: '上升金牛座：外表稳定，务实，喜欢舒适',
    gemini: '上升双子座：外表好奇，善变，善于沟通',
    cancer: '上升巨蟹座：外表情感，敏感，重视家庭',
    leo: '上升狮子座：外表自信，热情，喜欢成为焦点',
    virgo: '上升处女座：外表细致，分析，注重细节',
    libra: '上升天秤座：外表和谐，平衡，注重美感',
    scorpio: '上升天蝎座：外表深刻，神秘，有洞察力',
    sagittarius: '上升射手座：外表乐观，自由，喜欢探索',
    capricorn: '上升摩羯座：外表务实，严肃，有责任感',
    aquarius: '上升水瓶座：外表独立，创新，重视自由',
    pisces: '上升双鱼座：外表敏感，直觉，富有想象力'
  },
  interpretationRules: {
    planetInHouse: (planet, house) => {
      const planetInfo = astrologyKnowledge.planets[planet];
      const houseInfo = astrologyKnowledge.houses[house];
      if (planetInfo && houseInfo) {
        return `${planetInfo.name}在${houseInfo.name}：${planetInfo.description}与${houseInfo.description}的结合，${houseInfo.keywords.join('、')}等方面会受到影响。`;
      }
      return '';
    },
    planetAspect: (planet1, planet2, aspect) => {
      const planet1Info = astrologyKnowledge.planets[planet1];
      const planet2Info = astrologyKnowledge.planets[planet2];
      const aspectInfo = astrologyKnowledge.aspects[aspect];
      if (planet1Info && planet2Info && aspectInfo) {
        return `${planet1Info.name}与${planet2Info.name}${aspectInfo.name}：${aspectInfo.description}，${planet1Info.description}与${planet2Info.description}的能量相互作用。`;
      }
      return '';
    },
    comprehensiveReading: (chartData) => {
      return '根据您的星盘，我看到了以下关键信息...';
    }
  }
};

module.exports = astrologyKnowledge;