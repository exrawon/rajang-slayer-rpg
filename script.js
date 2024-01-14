let xp = 1,
	health = 100,
	gold = 50,
	currentWeapon = 0;
let fighting,
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
const cover = document.getElementsByClassName('tapCover');
const weapons = [
	{
		name: "🔪 Hunter's Knife",
		power: 5,
	},
	{
		name: '🗡️✦ Buster Sword',
		power: 20,
	},
	{
		name: '🗡️✦✦ Buster Sword II',
		power: 40,
	},
	{
		name: '🗡️✦✦✦ Jagras Deathclaw',
		power: 60,
	},
	{
		name: '🗡️✦✦✦✦ Wyvern Ignition',
		power: 80,
	},
	{
		name: '🗡️✦✦✦✦✦ Acid Shredder',
		power: 100,
	},
	{
		name: '🗡️✦✦✦✦✦✦ Acid Shredder II',
		power: 120,
	},
	{
		name: '🗡️✦✦✦✦✦✦✦ Lightbreak Blade',
		power: 140,
	},
	{
		name: '🗡️✦✦✦✦✦✦✦✦ Alatreon Greatsword',
		power: 160,
	},
	{
		name: '🗡️✦✦✦✦✦✦✦✦✦ Black Fatalis Blade',
		power: 200,
	},
];
const monsters = [
	{
		name: 'Great Jagras',
		monsterIcon: ' 🦎',
		level: 2,
		health: 15,
	},
	{
		name: 'Rathian',
		monsterIcon: ' 🦖',
		level: 8,
		health: 150,
	},
	{
		name: 'Rajang',
		monsterIcon: ' 💀',
		level: 20,
		health: 1000,
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
		banner: ['url(./assets/astera.webp)'],
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
			'Hunt a Rathian 🦖\n  ★★★',
			'Return from Expedition ↩',
		],
		'button functions': [fightEasy, fightHard, goTown],
		'button display': ['initial', 'initial', 'initial'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/ancient_forest.webp)'],
		text: 'You ride a wingdrake to the Ancient Forest.\n You see some monsters.\n',
	},
	{
		name: 'fight',
		'button text': ['Attack \n⚔️', 'Yolo Strats\n- 2 ❤️', 'Run 🏃🏻‍♀️'],
		'button functions': [attack, dodge, runAway],
		'button display': ['initial', 'initial', 'initial'],
		'button3 background': ['#acc8d7'],
		text: 'You are fighting a monster.\n',
	},
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
		banner: ['url(./assets/ancient_forest.webp)'],
		text: '',
	},
	{
		name: 'lose',
		'button text': ['Back to Astera ↩', 'REPLAY?', 'REPLAY?'],
		'button functions': [restart, restart, restart],
		'button display': ['initial', 'none', 'none'],
		'button3 background': ['#bebebe'],
		banner: ['url(./assets/quest_failed.jpg)'],
		text: '☠️☠️☠️ Game Over. ☠️☠️☠️ \n You were carted away by your Palico.\n',
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

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightBoss;
cover[2].onclick = tapToPlay;

function tapToPlay() {
	for (let elem of cover) {
		elem.style.display = 'none';
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
	text.innerText += '\n Travelling by wingdrake...';
	antiSpam(2100);
	setTimeout(() => update(locations[0]), 2000);
	setTimeout(() => {
		text.style.textAlign = 'initial';
	}, 2000);
}

function walkBack() {
	text.innerText += '\n\n Walking back to Astera...';
	antiSpam(1100);
	setTimeout(() => update(locations[0]), 1000);
}
function newGame() {
	text.innerText += '\nLoading new game...\n\n🐒\n\n';
	antiSpam(3100);
	setTimeout(() => update(locations[0]), 3000);
	setTimeout(() => {
		text.style.textAlign = 'initial';
	}, 3000);
}
function goStore() {
	text.innerText += '\n Using a ropelift...';
	antiSpam(1100);
	setTimeout(() => update(locations[1]), 1000);
}
function goCave() {
	text.innerText += '\n Travelling by wingdrake...';
	antiSpam(2100);
	setTimeout(() => update(locations[2]), 2000);
	setTimeout(() => {
		text.style.textAlign = 'initial';
	}, 2000);
}

function buyHealth() {
	antiSpam(300);
	if (gold >= 10 && health < 180) {
		gold -= 10;
		health += 20;
		goldText.innerText = gold;
		healthText.innerText = health;

		text.innerText += '\nChomp chomp! You gain 20 ❤️ health.';
	} else if (gold >= 10 && health >= 180 && health < 200) {
		gold -= 10;
		let healthRound = 200 - health;
		health += healthRound;
		goldText.innerText = gold;
		healthText.innerText = 200;
		text.innerText +=
			'\nSlurp slurp! You gain ' +
			healthRound +
			" ❤️ health.\nYou let out a big burp!\nThat's enough food for now...\n";
	} else if (gold >= 10 && health >= 200) {
		text.innerText = 'You are already at max ( 200 ) ❤️ health!\n';
	} else {
		text.innerText = 'You do not have enough gold to buy food.\n';
	}
}
function buyWeapon() {
	antiSpam(2100);
	text.innerText += '\nTalking to the Blacksmith...';
	if (currentWeapon < weapons.length - 1) {
		if (gold >= 30) {
			gold -= 30;
			currentWeapon++;
			let newWeapon = weapons[currentWeapon].name;
			inventory.push(newWeapon);
			setTimeout(() => {
				text.innerText =
					'You upgraded your weapon for 30 🪙.\n' + newWeapon + ' obtained.\n';
				text.innerText += '\nInventory:\n ' + inventory.join('\r\n') + '\n';
			}, 2000);
			goldText.innerText = gold;
		} else {
			text.innerText = 'You do not have enough gold to buy a weapon.';
		}
	} else {
		setTimeout(() => {
			text.innerText =
				'You already have the most powerful weapon!\nYou may sell your old weapons for 15 🪙 each.\n';
			text.innerText += '\nInventory: \n' + inventory.join('\r\n') + '\n';
			button2.innerText = 'Sell Weapons 💰 \n + 15 🪙';
			button2.onclick = sellWeapon;
		}, 2000);
	}
}
function sellWeapon() {
	antiSpam(2100);
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
		let oldWeapon = inventory.shift();
		text.innerText += '\nSelling off your junk...';
		setTimeout(() => {
			text.innerText = 'Sold ' + oldWeapon + ' for 15 🪙.\n';
			text.innerText += '\nInventory: \n' + inventory.join('\r\n') + '\n';
		}, 2000);
	} else {
		text.innerText = "Don't sell your only weapon!\n";
		text.innerText += '\nInventory: \n' + inventory.join('\r\n') + '\n';
	}
}
function fightEasy() {
	banner.style.backgroundImage = 'url(./assets/great_jagras.jpg)';
	fighting = 0;
	text.innerText += '\n Preparing for combat...';
	antiSpam(1100);
	setTimeout(() => goFight(), 1000);
}
function fightHard() {
	banner.style.backgroundImage = 'url(./assets/rathian.jpg)';
	fighting = 1;
	text.innerText += '\n Preparing for combat...';
	antiSpam(1100);
	setTimeout(() => goFight(), 1000);
}
function fightBoss() {
	banner.style.backgroundImage = 'url(./assets/rajang.jpg)';
	fighting = 2;
	text.innerText += '\n Preparing for combat...';
	antiSpam(1100);
	setTimeout(() => goFight(), 1000);
}

function goFight() {
	update(locations[3]);
	monsterHealth = monsters[fighting].health;
	monsterStats.style.display = 'block';
	monsterName.innerText =
		monsters[fighting].name + monsters[fighting].monsterIcon;
	monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
	antiSpam(2100);

	let damageToPlayer = getMonsterAttackValue(monsters[fighting].level);
	text.innerText += `\n${monsters[fighting].name} attacks! You lost ${damageToPlayer} ❤️ health.`;
	text.innerText += `\nYou strike with ${weapons[currentWeapon].name}.`;
	health -= damageToPlayer;
	if (isMonsterHit()) {
		let damageToMonster =
			weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
		monsterHealth -= damageToMonster;
		text.innerText += `\nYou dealt ${damageToMonster} ⚔️ damage!\n--------------------------------------------------------------------------`;
	} else {
		text.innerText +=
			'\nYou miss. 👀\n--------------------------------------------------------------------------';
	}
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;
	if (health <= 0) {
		healthText.innerText = 0;
		lose();
	} else if (monsterHealth <= 0) {
		monsterHealthText.innerText = 0;
		text.innerText += `\n${monsters[fighting].name} was slain!`;
		fighting === 2
			? setTimeout(winGame, 2000)
			: setTimeout(defeatMonster, 2000);
	}
	if (Math.random() <= 0.03 && inventory.length !== 1) {
		text.innerText += ` Your ${inventory.pop()} breaks.`;
		currentWeapon--;
	}
}

function getMonsterAttackValue(level) {
	const hit = level * 5 - Math.floor(Math.random() * xp);
	console.log(hit);
	return hit > 0 ? hit : 0;
}

function isMonsterHit() {
	return Math.random() > 0.2 || health < 20;
}

function dodge() {
	antiSpam(2100);
	health -= 2;
	healthText.innerText = health;
	if (Math.floor(Math.random() * 100 + 1) > 70) {
		text.innerText += `\nYou tripped and fell over a rock.\nYou lost 50 ❤️ health.\n--------------------------------------------------------------------------`;
		health -= 50;
		healthText.innerText = health;
	} else if (Math.floor(Math.random() * 100 + 1) > 40) {
		text.innerText += `\n${monsters[fighting].name} is getting ready for a big attack.\nYou looted 7 🪙 in the meantime.\n--------------------------------------------------------------------------`;
		gold += 7;
		goldText.innerText = gold;
	} else if (Math.floor(Math.random() * 100 + 1) > 12) {
		text.innerText += `\nYou dodge the attack from ${monsters[fighting].name}.\n ${monsters[fighting].name} looks at you angrily.\n--------------------------------------------------------------------------`;
	} else if (Math.floor(Math.random() * 100 + 1) > 5) {
		text.innerText += `\n✨️✨️✨️✨️✨️✨️💎✨️✨️✨️✨️✨️✨️\n\nA ${monsters[fighting].name} Gem drops from the monster's butthole.\n You quickly retrieve it while ${monsters[fighting].name} is distracted.\nYou gain 999 🪙.\n\n✨️✨️✨️✨️✨️✨️💎✨️✨️✨️✨️✨️✨️\n--------------------------------------------------------------------------`;
		gold += 999;
		goldText.innerText = gold;
	} else {
		monsterHealthText.innerText = 0;
		text.style.textAlign = 'center';
		text.innerText = `\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n\nYou received a divine blessing.\n\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀\n\n`;
		fighting === 2
			? setTimeout(winGame, 2000)
			: setTimeout(defeatMonster, 2000);
	}
	if (health <= 0) {
		healthText.innerText = 0;
		lose();
	}
}
function defeatMonster() {
	text.style.textAlign = 'center';
	let goldGain = Math.floor(monsters[fighting].level * Math.random() * 6.7 + 5);
	let xpGain = monsters[fighting].level;
	gold += goldGain;
	xp += xpGain;
	goldText.innerText = gold;
	xpText.innerText = xp;
	update(locations[4]);
	text.innerText += `✨✨✨ Victory!! ✨✨✨\n Your level increased by ${xpGain}!\nYou found ${goldGain} 🪙.\n✨✨✨✨✨✨✨✨✨\n`;
}

function runAway() {
	text.innerText += '\n\n Using a farcaster...';
	antiSpam(1100);
	fighting === 2
		? setTimeout(() => update(locations[0]), 1000)
		: setTimeout(() => update(locations[2]), 1000);
}
function lose() {
	antiSpam(500);
	text.style.textAlign = 'center';
	update(locations[5]);
}

function winGame() {
	antiSpam(500);
	text.style.textAlign = 'center';
	update(locations[6]);
}

function restart() {
	xp = 1;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["🔪 Hunter's Knife"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
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
