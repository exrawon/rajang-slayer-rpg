let xp = 1,
	health = 100,
	gold = 30,
	currentWeapon = 0,
	inStore,
	fighting,
	monsterHealth,
	inventory = ["🔪 Hunter's Knife"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const banner = document.querySelector('#banner');
const volume = document.querySelector('#volume');
const cornerInfo = document.querySelector('#cornerInfo');
const cover = document.getElementsByClassName('tapCover');
const bgmAll = document.querySelectorAll('audio');
const bgmMain = document.querySelector('#bgmMain');
const bgmBoss = document.querySelector('#bgmBoss');
const bgmWild = document.querySelector('#bgmWild');
const bgmStore = document.querySelector('#bgmStore');
const weapons = [
	{
		name: "🔪 Hunter's Knife",
		power: 12,
	},
	{
		name: '🗡️✦ Buster Sword',
		power: 20,
	},
	{
		name: '🗡️✦✦ Jagras Deathclaw',
		power: 40,
	},
	{
		name: '🗡️✦✦✦ Guild Palace Blade',
		power: 60,
	},
	{
		name: '🗡️✦✦✦✦ Nergal Judicator',
		power: 95,
	},
	{
		name: '🗡️✦✦✦✦✦ Wyvern Ignition',
		power: 130,
	},
	{
		name: '🗡️✦✦✦✦✦✦ Winged Seraphyd',
		power: 175,
	},
	{
		name: '🗡️✦✦✦✦✦✦✦ Lightbreak Blade',
		power: 300,
	},
	{
		name: '🗡️✦✦✦✦✦✦✦✦ Alatreon Greatsword',
		power: 500,
	},
	{
		name: '🗡️✦✦✦✦✦✦✦✦✦ Black Fatalis Blade⭐',
		power: 9000,
	},
];
const monsters = [
	{
		name: 'Great Jagras',
		monsterIcon: ' 🦎',
		level: 5,
		health: 50,
		goldMultiplier: 2,
		color: '#1EFF0C',
	},
	{
		name: 'Rathalos',
		monsterIcon: ' 🐦',
		level: 20,
		health: 400,
		goldMultiplier: 4.5,
		color: '#33CCFF',
	},
	{
		name: 'AT Rajang',
		monsterIcon: ' 💀',
		level: 30,
		health: 69000,
		color: '#FFB84D',
	},
];
const locations = [
	{
		name: 'town',
		'button text': [
			'Go to Tradeyard 🛒',
			'Go to Ancient Forest 🌳',
			'Slay Rajang 🐒\n ★★★★★★',
		],
		'button functions': [goStore, goCave, fightBoss],
		'button display': ['initial', 'initial', 'initial'],
		'button3 background': ['#dc3545'],
		banner: ['url(./assets/astera.jpg)'],
		text: 'You are in Astera.\n A loud roar echoes in the distance...\n Followed by faint screams.\n Rajang is on the loose.\n Where would you like to go?\n',
	},
	{
		name: 'tradeyard',
		'button text': [
			'Eat at Canteen 🍖 \n 10 🪙',
			'Upgrade Weapon ⚒️ \n 30 🪙',
			'Back to Astera ↩',
		],
		'button functions': [buyHealth, buyWeapon, walkBack],
		'button display': ['initial', 'initial', 'initial'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/canteen.png)'],
		text: 'You arrive at the tradeyard...\n There is a canteen and a smithy.\n',
	},
	{
		name: 'ancient forest',
		'button text': [
			'Hunt a Great Jagras 🦎\n  ★',
			'Hunt a Rathalos 🐦\n  ★★★',
			'Return from Expedition ↩',
		],
		'button functions': [fightEasy, fightHard, goTown],
		'button display': ['initial', 'initial', 'initial'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/ancient_forest.jpg)'],
		text: 'Many monsters roam the Ancient Forest.\nYou see a Great Jagras devouring an Aptonoth...\nMeanwhile a Rathalos patrols the sky.\n',
	},
	{
		name: 'fight',
		'button text': ['Attack \n⚔️', 'Panic\n🙀', 'Run Away 🏃🏻‍♀️'],
		'button functions': [attack, dodge, runAway],
		'button display': ['initial', 'initial', 'initial'],
		'button3 background': ['#acc8d7'],
		text: 'You are fighting a monster.\n',
	},
	//legacy code, removed from game in ver 1.3.0 AT
	{
		name: 'kill monster',
		'button text': [
			'Fast Travel to Camp 🏕️',
			'Return from Expedition ↩',
			'Return from Expedition ↩',
		],
		'button functions': [goCave, goTown, goTown],
		'button display': ['initial', 'none', 'initial'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/ancient_forest.jpg)'],
		text: '',
	},
	{
		name: 'lose',
		'button text': ['Back to Astera ↩', 'REPLAY?', 'REPLAY?'],
		'button functions': [restart, restart, restart],
		'button display': ['initial', 'none', 'none'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/quest_failed.jpg)'],
		text: '\n☠️☠️☠️ Game Over. ☠️☠️☠️ \n You were carted away by your Palico.\n\n',
	},
	{
		name: 'win',
		'button text': ['Play Again 🎮', 'REPLAY?', 'REPLAY?'],
		'button functions': [restart, restart, restart],
		'button display': ['initial', 'none', 'none'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/quest_complete.jpg)'],
		text: '\n✨✨✨✨✨✨✨✨✨✨✨✨✨\n🎉🎉🎉 Congratulations! 🎉🎉🎉\nYou defeated Rajang. Astera is saved! \n🎉🎉🎉 Thanks for playing! 🎉🎉🎉\n✨✨✨✨✨✨✨✨✨✨✨✨✨\n\n',
	},
];

//end of declaration section//

button1.onclick = () => {
	goStore();
};
button2.onclick = () => {
	goCave();
};
button3.onclick = () => {
	fightBoss();
};
banner.onclick = () => {
	muteBGM();
	playClick();
};
cover[1].onclick = tapToPlay;
cover[2].onclick = tapToPlay;
cornerInfo.onclick = muteBGM;

function tapToPlay() {
	setTimeout(() => {
		bgmMain.play();
	}, 3000);
	playRoar();
	// playPikachu();
	document.querySelector('#coverTextSmall').classList.add('disabledbutton');
	setTimeout(() => {
		document
			.querySelector('#coverTextSmall')
			.classList.remove('disabledbutton');
	}, 3100);
	document.querySelector('#coverTextLarge').classList.add('disabledbutton');
	setTimeout(() => {
		document
			.querySelector('#coverTextLarge')
			.classList.remove('disabledbutton');
	}, 3100);
	document.querySelector('#title-container').classList.add('titleClicked');
	setTimeout(() => {
		for (let elem of cover) {
			elem.style.display = 'none';
		}
	}, 3000);
}
function resetCover() {
	bgmMain.currentTime = 0;
	bgmMain.play();
	document.querySelector('#title-container').classList.remove('titleClicked');
	for (let elem of cover) {
		elem.style.display = '';
	}
}
//function that updates the buttons, its functions and the textbox, set to a given location
function update(location) {
	monsterStats.style.display = 'none';
	button1.innerText = location['button text'][0];
	button2.innerText = location['button text'][1];
	button3.innerText = location['button text'][2];
	button1.onclick = location['button functions'][0];
	button2.onclick = location['button functions'][1];
	button3.onclick = location['button functions'][2];
	button1.style.display = location['button display'][0];
	button2.style.display = location['button display'][1];
	button3.style.display = location['button display'][2];
	button3.style.background = location['button3 background'];
	banner.style.backgroundImage = location['banner'];
	text.innerText = location.text;
}
function goTown() {
	playGoBack();
	bgmWild.pause();
	bgmWild.currentTime = 0;
	bgmMain.play();
	fighting = undefined;
	text.innerText += '\n Travelling by wingdrake...';
	antiSpam(2100);
	setTimeout(() => {
		text.style.textAlign = 'initial';
		update(locations[0]);
	}, 2000);
}
function goStore() {
	playClick();
	antiSpam(1100);
	inStore = true;
	setTimeout(() => {
		bgmMain.pause();
		bgmMain.currentTime = 0;
		bgmStore.play();
	}, 1000);

	text.innerText += '\n Using a ropelift...';
	if (currentWeapon == weapons.length - 1 && inventory.length == 1) {
		setTimeout(() => update(locations[1]), 1000);
		setTimeout(() => {
			button2.style.display = 'none';
		}, 1000);
	} else if (currentWeapon === weapons.length - 2) {
		setTimeout(() => update(locations[1]), 1000);
		setTimeout(() => {
			button2.innerText = 'Upgrade Weapon ⚒️ \n 999 🪙';
		}, 1000);
	} else {
		setTimeout(() => update(locations[1]), 1000);
	}
}
function goCave() {
	playClick();
	bgmWild.pause();
	bgmWild.currentTime = 0;
	bgmMain.play();
	text.innerText += '\n Travelling by wingdrake...';
	antiSpam(2100);
	setTimeout(() => update(locations[2]), 2000);
	setTimeout(() => {
		text.style.textAlign = 'initial';
	}, 2000);
}

function walkBack() {
	playGoBack();
	text.innerText += '\n\n Walking back to Astera...';
	antiSpam(1100);
	setTimeout(() => {
		bgmStore.pause();
		bgmStore.currentTime = 0;
		bgmMain.play();
		update(locations[0]);
		inStore = false;
	}, 1000);
}

function buyHealth() {
	playClick();
	antiSpam(1000);
	if (gold >= 10 && health < 180) {
		gold -= 10;
		health += 20;
		goldText.innerText = gold;
		healthText.innerText = health;
		playBite();
		text.innerText += '\nChomp chomp! You gain 20 ❤️ health.';
	} else if (gold >= 10 && health >= 180 && health < 200) {
		gold -= 10;
		let healthRound = 200 - health;
		health += healthRound;
		goldText.innerText = gold;
		healthText.innerText = 200;
		playBite();
		text.innerText +=
			'\nSlurp slurp slurrrp! You gain ' +
			healthRound +
			" ❤️ health.\nYou let out a big burp!\nThat's enough food for now...\n";
	} else if (gold >= 10 && health >= 200) {
		playDenied();
		text.innerText = 'You are already at max ( 200 ) ❤️ health!\n';
	} else {
		playDenied();
		text.innerText = 'You do not have enough 🪙 gold to buy food.\n';
	}
}
function buyWeapon() {
	playClick();
	antiSpam(2100);
	text.innerText += '\n\nTalking to the Blacksmith...';
	if (currentWeapon < weapons.length - 1) {
		if (currentWeapon === weapons.length - 3 && gold >= 30) {
			setTimeout(() => {
				button2.innerText = 'Upgrade Weapon ⚒️ \n 999 🪙';
			}, 2000);
		}
		if (currentWeapon === weapons.length - 2) {
			if (gold >= 999) {
				gold -= 999;
				currentWeapon++;
				let newWeapon = weapons[currentWeapon].name;
				inventory.push(newWeapon);
				goldText.innerText = gold;
				setTimeout(() => {
					text.innerText =
						'You upgraded your weapon for 999 🪙.\n' +
						newWeapon +
						' obtained.\n';
					text.innerText += '\nInventory:\n ' + inventory.join('\r\n') + '\n';
					playSpending();
				}, 2000);
			} else {
				playDenied();
				text.innerText =
					'You do not have enough 🪙 gold to buy a new weapon.\n\nInventory:\n ' +
					inventory.join('\r\n') +
					'\n';
			}
		} else if (gold >= 30) {
			gold -= 30;
			currentWeapon++;
			let newWeapon = weapons[currentWeapon].name;
			inventory.push(newWeapon);
			goldText.innerText = gold;
			setTimeout(() => {
				text.innerText =
					'You upgraded your weapon for 30 🪙.\n' + newWeapon + ' obtained.\n';
				text.innerText += '\nInventory:\n ' + inventory.join('\r\n') + '\n';
				playSpending();
			}, 2000);
		} else {
			playDenied();
			text.innerText =
				'You do not have enough 🪙 gold to buy a new weapon.\n\nInventory:\n ' +
				inventory.join('\r\n') +
				'\n';
		}
	} else {
		setTimeout(() => {
			text.innerText =
				'You already have the most powerful weapon!\nYou may sell your old weapons for 15 🪙 each.\n';
			text.innerText += '\nInventory: \n' + inventory.join('\r\n') + '\n';
			button2.innerText = 'Sell Weapons 💰 \n + 15 🪙';
			button2.onclick = sellWeapon;
			playDenied();
		}, 2000);
	}
}
function sellWeapon() {
	playClick();
	antiSpam(2100);
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
		let oldWeapon = inventory.shift();
		text.innerText += '\n\nSelling off your junk...';
		setTimeout(() => {
			text.innerText = 'Sold ' + oldWeapon + ' for 15 🪙.\n';
			text.innerText += '\nInventory: \n' + inventory.join('\r\n') + '\n';
			playSelling();
		}, 2000);
	} else {
		playDenied();
		text.innerText = "Don't sell your only weapon! 👀\n";
		text.innerText += '\nInventory: \n' + inventory.join('\r\n') + '\n';
	}
}
function fightEasy() {
	playClick();
	banner.style.backgroundImage = 'url(./assets/great_jagras.jpg)';
	fighting = 0;
	monsterName.style.color = monsters[fighting].color;
	text.innerText += '\n Preparing for combat...';
	antiSpam(1100);
	setTimeout(() => goFight(), 1000);
}
function fightHard() {
	playClick();
	banner.style.backgroundImage = 'url(./assets/rathalos.jpg)';
	fighting = 1;
	monsterName.style.color = monsters[fighting].color;
	text.innerText += '\n Preparing for combat...';
	antiSpam(1100);
	setTimeout(() => goFight(), 1000);
}
function fightBoss() {
	playClick();
	banner.style.backgroundImage = 'url(./assets/rajang.jpg)';
	fighting = 2;
	monsterName.style.color = monsters[fighting].color;
	text.innerText += '\n Preparing for combat...';
	antiSpam(1100);
	setTimeout(() => goFight(), 1000);
}

function goFight() {
	if (fighting === 2) {
		bgmBoss.play();
		bgmMain.pause();
		bgmMain.currentTime = 0;
	} else {
		bgmWild.play();
		bgmMain.pause();
		bgmMain.currentTime = 0;
	}
	update(locations[3]);
	monsterHealth = monsters[fighting].health;
	monsterStats.style.display = 'block';
	monsterName.innerText =
		monsters[fighting].name + monsters[fighting].monsterIcon;
	monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
	playClick();
	antiSpam(2100);
	let damageToPlayer = getMonsterAttackValue(monsters[fighting].level);
	if (damageToPlayer !== 0) {
		text.innerText += `\n${monsters[fighting].name} attacks! You lost ${damageToPlayer} ❤️ health.`;
		text.innerText += `\nYou strike with ${weapons[currentWeapon].name}.`;
		health -= damageToPlayer;
	} else {
		text.innerText += `\n${monsters[fighting].name} swings at you but it missed!`;
		text.innerText += `\nYou strike with ${weapons[currentWeapon].name}.`;
	}

	if (isMonsterHit()) {
		currentWeapon === weapons.length - 1 ? playHitBoss() : playHitMonster();
		let damageToMonster =
			weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
		monsterHealth -= damageToMonster;
		text.innerText += `\nYou dealt ${damageToMonster} ⚔️ damage!\n--------------------------------------------------------------------------`;
	} else {
		playHitMiss();
		text.innerText +=
			'\nYou miss. 👀\n--------------------------------------------------------------------------';
	}
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;
	if (Math.random() <= 0.03 && inventory.length !== 1) {
		playDestroyed();
		text.innerText += `\nYour ${inventory.pop()} breaks.\n--------------------------------------------------------------------------`;
		currentWeapon--;
	}
	if (health <= 0) {
		if (monsterHealth <= 0) {
			monsterHealthText.innerText = 0;
		}
		playLose();
		healthText.innerText = 0;
		text.innerText += `\n☠️ You have died. ☠️`;
		setTimeout(lose, 2000);
	} else if (monsterHealth <= 0) {
		if (fighting !== 2) {
			setTimeout(() => {
				playDefeatMonster();
			}, 600);
		}
		monsterHealthText.innerText = 0;
		text.innerText += `\n${monsters[fighting].name} was slain!`;
		fighting === 2
			? setTimeout(winGame, 2000)
			: setTimeout(defeatMonster, 2000);
	}
}

function getMonsterAttackValue(level) {
	const hit = Math.round(level * 3.3) - Math.floor(Math.random() * xp);
	return hit > 0 ? hit : 0;
}

function isMonsterHit() {
	return Math.random() > 0.1 || health < 20;
}

function dodge() {
	playDodge();
	antiSpam(2100);
	health -= 2;
	healthText.innerText = health;
	if (Math.floor(Math.random() * 100 + 1) > 76) {
		text.innerText += `\nYou tripped and fell over a rock.\nYou lost 50 ❤️ health.\n--------------------------------------------------------------------------`;
		health -= 50;
		healthText.innerText = health;
		if (health > 0) {
			playHurt();
		}
	} else if (Math.floor(Math.random() * 100 + 1) > 39) {
		playSelling();
		text.innerText += `\nOooh...a shiny! You looted 7 🪙.\n--------------------------------------------------------------------------`;
		gold += 7;
		goldText.innerText = gold;
	} else if (Math.floor(Math.random() * 100 + 1) > 9) {
		text.innerText += `\nYou dodge the attack from ${monsters[fighting].name}.\n ${monsters[fighting].name} looks at you angrily.\n--------------------------------------------------------------------------`;
	} else if (Math.floor(Math.random() * 100 + 1) > 4) {
		playRareDrop();
		text.innerText += `\n✨️✨️✨️✨️✨️✨️💎✨️✨️✨️✨️✨️✨️\n\nA ${monsters[fighting].name} Gem drops from the monster's butthole.\n You quickly retrieve it while ${monsters[fighting].name} is distracted.\nYou gain 200 🪙.\n\n✨️✨️✨️✨️✨️✨️💎✨️✨️✨️✨️✨️✨️\n--------------------------------------------------------------------------`;
		gold += 200;
		goldText.innerText = gold;
	} else {
		monsterHealthText.innerText = 0;
		text.style.textAlign = 'center';
		text.innerText = `\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n\nYou received a divine blessing.\n\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n\n`;
		playBlessing();
		fighting === 2
			? setTimeout(winGame, 2000)
			: setTimeout(defeatMonster, 2000);
	}
	if (health <= 0) {
		playLose();
		healthText.innerText = 0;
		text.innerText += `\n☠️ You have died. ☠️`;
		setTimeout(lose, 2000);
	}
}
function defeatMonster() {
	playLevelUp();
	let goldGain =
		Math.floor(Math.random() * 5) +
		Math.round(
			monsters[fighting].level * 2 * monsters[fighting].goldMultiplier
		);
	let xpGain = monsters[fighting].level;
	gold += goldGain;
	xp += xpGain;
	goldText.innerText = gold;
	xpText.innerText = xp;
	update(locations[2]);
	text.innerText = `Victory!\n You found ${goldGain} 🪙.\nYour level increased by ${xpGain}!\n`;
}

function runAway() {
	playEscape();
	antiSpam(1600);
	setTimeout(() => {
		bgmBoss.pause();
		bgmWild.pause();
		bgmMain.play();
		bgmBoss.currentTime = 0;
		bgmWild.currentTime = 0;
	}, 1500);

	text.innerText += '\n\n Using a farcaster...';
	fighting === 2
		? setTimeout(() => update(locations[0]), 1500)
		: setTimeout(() => update(locations[2]), 1500);
	fighting = undefined;
}
function lose() {
	bgmMain.pause();
	bgmBoss.pause();
	bgmBoss.currentTime = 0;
	bgmWild.pause();
	bgmWild.currentTime = 0;
	fighting = undefined;
	text.style.textAlign = 'center';
	update(locations[5]);
}
function newGame() {
	antiSpam(3100);
	text.innerText += '\nLoading new game...\n\n🐒\n\n';
	setTimeout(() => update(locations[0]), 3000);
	setTimeout(() => {
		text.style.textAlign = 'initial';
	}, 3000);
}
function winGame() {
	playVictory();
	text.style.textAlign = 'center';
	update(locations[6]);
	fighting = undefined;
}

function restart() {
	xp = 1;
	health = 100;
	gold = 30;
	currentWeapon = 0;
	inventory = ["🔪 Hunter's Knife"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	setTimeout(resetCover, 3000);
	newGame();
}

function antiSpam(delay) {
	button1.disabled = true;
	setTimeout(() => (button1.disabled = false), delay);
	button2.disabled = true;
	setTimeout(() => (button2.disabled = false), delay);
	button3.disabled = true;
	setTimeout(() => (button3.disabled = false), delay);
}

//audio controls section//
function muteBGM() {
	Array.from(bgmAll).map((element) => {
		if (element.muted == false) {
			element.muted = true;
			volume.innerText = '🔈';
		} else {
			element.muted = false;
			volume.innerText = '🔊';
		}
	});
}

playRoar = function () {
	let audio = new Audio('./assets/roar_rajang.mp3');
	audio.loop = false;
	audio.play();
};

// playPikachu = function () {
// 	let audio = new Audio('./assets/pikachu.mp3');
// 	audio.loop = false;
// 	audio.play();
// };

playVictory = function () {
	let audio = new Audio('./assets/victory.mp3');
	audio.loop = false;
	audio.play();
	bgmMain.pause();
	bgmBoss.pause();
	bgmBoss.currentTime = 0;
};

playSpending = function () {
	let audio = new Audio('./assets/spending.mp3');
	audio.loop = false;
	audio.play();
};

playSelling = function () {
	let audio = new Audio('./assets/selling.mp3');
	audio.loop = false;
	audio.play();
};

playBite = function () {
	let audio = new Audio('./assets/bite.mp3');
	audio.loop = false;
	audio.play();
};

playBlessing = function () {
	let audio = new Audio('./assets/blessing.mp3');
	audio.loop = false;
	audio.play();
};

playClick = function () {
	let audio = new Audio('./assets/click.mp3');
	audio.loop = false;
	audio.play();
};

playGoBack = function () {
	let audio = new Audio('./assets/go_back.mp3');
	audio.loop = false;
	audio.play();
};

playHitMonster = function () {
	let audio = new Audio('./assets/hit_monster.mp3');
	audio.loop = false;
	audio.play();
};
playHitBoss = function () {
	let audio = new Audio('./assets/hit_boss.mp3');
	audio.loop = false;
	audio.play();
};
playHitMiss = function () {
	let audio = new Audio('./assets/hit_miss.mp3');
	audio.loop = false;
	audio.play();
};
playHurt = function () {
	let audio = new Audio('./assets/hurt.mp3');
	audio.loop = false;
	audio.play();
};
playDefeatMonster = function () {
	let audio = new Audio('./assets/defeat_monster.mp3');
	audio.loop = false;
	audio.play();
};
playRareDrop = function () {
	let audio = new Audio('./assets/rare_drop.mp3');
	audio.loop = false;
	audio.play();
};

playDestroyed = function () {
	let audio = new Audio('./assets/destroyed.mp3');
	audio.loop = false;
	audio.play();
};

playLose = function () {
	let audio = new Audio('./assets/lose.mp3');
	audio.loop = false;
	audio.play();
};

playDodge = function () {
	let audio = new Audio('./assets/dodge.mp3');
	audio.loop = false;
	audio.play();
};

playEscape = function () {
	let audio = new Audio('./assets/escape.mp3');
	audio.loop = false;
	audio.play();
};

playLevelUp = function () {
	let audio = new Audio('./assets/levelup.mp3');
	audio.loop = false;
	audio.play();
};

playDenied = function () {
	let audio = new Audio('./assets/denied.mp3');
	audio.loop = false;
	audio.play();
};
