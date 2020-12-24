define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
            "Hello there",
            "We don't need to see your identification",
            "You are not the player we're looking for",
            "Move along, move along..."
        ],

        "king": [
            "HOU HOU HOU",
            "HYVÄÄ JOULUA OSKARI JA KAIKKI",
            "OLET ANSAINNUT JOULULAHJAN",
            "SÄÄSTÄ NINTENDOON",
            "VOIT AVATA TAIKALAATIKON KOODILLA",
            "2021"
        ],

        "villagegirl": [
            "Nuo rotat iljettää mua",
            "huiroppa niitä tuolla miekalla pois täältä"
          
        ],

        "villager": [
            "Howdy stranger. Do you like poetry?",
            "Roses are red, violets are blue...",
            "I like hunting rats, and so do you...",
            "The rats are dead, now what to do?",
            "To be honest, I have no clue.",
            "Maybe the forest, could interest you...",
            "or instead, cook a rat stew."
        ],

        "agent": [
            "Kuuleppas",
            "kerron salaisuuden",
            "sitä ei kukaan tiedä",
            "jännittääkö",
            "tuolla ylempänä oikealla talossa on paha monsteri",
            "älä mene sinne",
            "tai mene jos ei hirvitä",
            "ha haa"
        ],

        "rick": [
            "We're no strangers to love",
            "You know the rules and so do I",
            "A full commitment's what I'm thinking of",
            "You wouldn't get this from any other guy",
            "I just wanna tell you how I'm feeling",
            "Gotta make you understand",
            "Never gonna give you up",
            "Never gonna let you down",
            "Never gonna run around and desert you",
            "Never gonna make you cry",
            "Never gonna say goodbye",
            "Never gonna tell a lie and hurt you"
        ],

        "scientist": [{
			"text": [//default
				"Päivää",
				"Oon hullu keksijä",
                "Tässä on kaksi pulloa",
                "Punaisesta saa lisää voimaa",
                "Keltaisesta tulee kummallinen kettupuku",
                "ja muutut vahingoittumattomaksi"
			]},
			{"condition": function(game){return (game.player.invincible);},
			 "text": [
				"Did you not listen to what I said?!!",
				"the famous fire-potion only lasts a few seconds",
				"You shouldn't be wasting them talking to me…"
			]},
			{"condition": function(game){return ((game.player.getSpriteName() == "firefox")
											&& !(game.player.invincible));},
			 "text": [
				"Ha ha ha, *name*",
				"All that glitters is not gold…",
				"-sigh-",
				"Did you really think you could abuse me with your disguise?",
				"I conceived that f…, that potion.",
				"Better not use your outfit as a deterrent,",
				"The goons you'll meet will attack you whatever you look like."
			]}
			
		],

        "nyan": [
            "nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan nyan nyan"
        ],

        "beachnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "forestnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "desertnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "lavanpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "priest": [
            "Hei *name*",
          "Sun tehtäväsi on löytää joulupukki",
          "viisas Raimo-paappa tietää missä se on",
          "paappa on tuolla alhaalla"
        ],

        "sorcerer": [
            "Mitäs Oskari!", 
            "olen viisas Raimo-paappa",  
            "Sun kuule pitäis löytää joulupukki",
            "se asuu Korvatunturilla",
            "Korvatunturilla on laavaa ja hirviöitä",
            "sun täytyy mennä ylöspäin kenttää tosi pitkälle",
            "ja hankkia kunnon ase ja haarniska",
            "muuten käy kuule hassusti"
        ],

        "octocat": [
            "Hau",
            "Olen Huima-koira",
            "Raimo-paappa taikoi mulle naaman",
            "ja osaan puhua",
            "paappa on tuolla alhaalla",
            "sillä on keppi jolla se taikoo", 
            "ja punainen angry birds-huppari"
            ],

        "coder": [
            "Pelaan täällä jouluna",
            "ei oo muuta tekemistä"
        ],

        "beachnpc": [
            "Don't mind me, I'm just here on vacation.",
            "I have to say...",
            "These giant crabs are somewhat annoying.",
            "Could you please get rid of them for me?"
        ],

        "desertnpc": [
            "One does not simply walk into these mountains...",
            "An ancient undead lord is said to dwell here.",
            "Nobody knows exactly what he looks like...",
            "...for none has lived to tell the tale.",
            "It's not too late to turn around and go home, kid."
        ],

        "othernpc": [
            "lorem ipsum",
            "lorem ipsum"
        ]
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            if(typeof NpcTalk[this.itemKind][0] === 'string'){
				this.discourse = -1;
				this.talkCount = NpcTalk[this.itemKind].length;
			}
			else{
				this.discourse = 0;
				this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
			}
            this.talkIndex = 0;
        },
        
        selectTalk: function(game){
			var change = false;
			if(this.discourse != -1){
				var found = false;
				for(var i = 1; !found && i<NpcTalk[this.itemKind].length; i++){
					if(NpcTalk[this.itemKind][i]["condition"](game)){
						if(this.discourse != i){
							change = true;
							this.discourse = i;
							this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
						}
						found = true;
					}
				}
				if(!found){
					if(this.discourse != 0){
						change = true;
						this.discourse = 0;
						this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
					}
				}
			}
			return change;
		},

        talk: function(game) {
            var msg = "";

            if(this.selectTalk(game) || (this.talkIndex > this.talkCount) ){
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
				if(this.discourse == -1){
					msg = NpcTalk[this.itemKind][this.talkIndex];
				}
				else{
					msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
				}
            }
            this.talkIndex += 1;

            return msg.replace('*name*',game.player.name);
        }
    });

    return Npc;
});
