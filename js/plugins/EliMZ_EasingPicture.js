//==========================================================================
// EliMZ_EasingPicture.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.2.4♦ Add more easing animations to pictures!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-easing-picture-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

● New ease types to animate your pictures.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1AgcyvAuzviTtH_bmuYvAv1F0093BQMW7HJhm75RqClw/edit?usp=sharing

You can see some examples of how it works here:
https://easings.net/

============================================================================

@command cmd_setEasing
@text Change Ease type
@desc Can be used anywhere before move the picture. But must specify a pic Id.

    @arg id
    @text Picture Id
    @type text
    @desc The picture Id. Can use \v[ID] or formulas.
    @default 1

    @arg easing
    @text Ease type
    @type select
    @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- IN --- @option quadIn @option cubicIn @option quartIn @option quintIn @option sineIn @option expoIn @option circIn @option elasticIn @option backIn @option bounceIn @option --- OUT --- @option quadOut @option cubicOut @option quartOut @option quintOut @option sineOut @option expoOut @option circOut @option elasticOut @option backOut @option bounceOut @option --- IN OUT --- @option quadInOut @option cubicInOut @option quartInOut @option quintInOut @option sineInOut @option expoInOut @option circInOut @option elasticInOut @option backInOut @option bounceInOut
    @desc
    @default linear

@command cmd_setQuickEasing
@text Change Ease type(Quick)
@desc To be used before the default move picture command. Don't need specify Id.

    @arg easing
    @text Ease type
    @type select
    @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- IN --- @option quadIn @option cubicIn @option quartIn @option quintIn @option sineIn @option expoIn @option circIn @option elasticIn @option backIn @option bounceIn @option --- OUT --- @option quadOut @option cubicOut @option quartOut @option quintOut @option sineOut @option expoOut @option circOut @option elasticOut @option backOut @option bounceOut @option --- IN OUT --- @option quadInOut @option cubicInOut @option quartInOut @option quintInOut @option sineInOut @option expoInOut @option circInOut @option elasticInOut @option backInOut @option bounceInOut
    @desc
    @default linear

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_EasingPicture = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.EasingPicture = {

    picEasingType: new Array(100).fill(""),
    quickEasingType: '',
    easingMethod: {

        linear(t){
            return t;
        },
    
        quadIn(t){
            return t**2;
        },
    
        slowStart(t){
            return this.quadIn(t)
        },
    
        quadOut(t){
            return t * (2 - t);
        },
    
        slowEnd(t){
            return this.quadOut(t)
        },
    
        quadInOut(t){
            if((t *= 2) < 1){
                return 0.5 * t**2;
            }
            return -0.5 * (--t * (t - 2) - 1);
        },
    
        slowStartEnd(t){
            return this.quadInOut(t)
        },
    
        cubicIn(t){
            return t**3;
        },
    
        cubicOut(t){
            return --t * t * t + 1;
        },
    
        cubicInOut(t){
            if((t *= 2) < 1){
                return 0.5 * t**3;
            }
        
            return 0.5 * ((t -= 2) * t * t + 2);
        },
    
        quartIn(t){
            return t**4;
        },
    
        quartOut(t){
            return 1 - --t * t**3;
        },
    
        quartInOut(t){
            if((t *= 2) < 1){
                return 0.5 * t**4;
            }
        
            return -0.5 * ( (t -= 2) * t**3 - 2);
        },
    
        quintIn(t){
            return t**5;
        },
    
        quintOut(t){
            return --t * t**4 + 1;
        },
    
        quintInOut(t){
            if((t *= 2) < 1){
                return 0.5 * t**5;
            }
        
            return 0.5 * ( (t -= 2) * t**4 + 2);
        },
    
        sineIn(t){
            const pi = Math.PI;
            return Math.cos(t * pi / 2 - pi) + 1.0;
        },
    
        sineOut(t){
            return Math.sin((t * Math.PI) / 2);
        },
    
        sineInOut(t){
            return 0.5 * (1 - Math.cos(Math.PI * t));
        },
    
        expoIn(t){
            return t === 0 ? 0 : Math.pow(1024, t - 1);
        },
    
        expoOut(t){
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        },
    
        expoInOut(t){
            if (t === 0){
                return 0;
            }
    
            if (t === 1){
                return 1;
            }
    
            if ((t *= 2) < 1) {
                const expo = t - 1;
                return 0.5 * Math.pow(1024, t - 1);
            }
    
            return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
        },
    
        circIn(t){
            return 1 - Math.sqrt(1 - t * t);
        },
    
        circOut(t){
            return Math.sqrt(1 - --t * t);
        },
    
        circInOut(t){
            if ((t *= 2) < 1){
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            }
    
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
    
        elasticIn(t){
            if (t === 0){
                return 0;
            }
    
            if (t === 1){
                return 1;
            }
    
            return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
        },
    
        elasticOut(t){
            if (t === 0){
                return 0;
            }
    
            if (t === 1){
                return 1;
            }
    
            return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
        },
    
        elasticInOut(t){
            if (t === 0){
                return 0;
            }
    
            if (t === 1){
                return 1;
            }
    
            t *= 2;
            if (t < 1){
                return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
            }
    
            return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
        },
    
        backIn(t){
            const s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
    
        backOut(t){
            const s = 1.70158;
            return --t * t * ((s + 1) * t + s) + 1;
        },
    
        backInOut(t){
            const s = 1.70158 * 1.525;
    
            if((t *= 2) < 1){
                return 0.5 * (t * t * ((s + 1) * t - s));
            }
    
            return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
        },
    
        bounceIn(t){
            return 1 - this.bounceOut(1 - t);
        },
    
        bounceOut(t){
            if (t < 1 / 2.75) {
                return 7.5625 * t * t;
    
            } else if (t < 2 / 2.75) {
                return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    
            } else if (t < 2.5 / 2.75) {
                return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    
            } else {
                return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }
        },
    
        bounceInOut(t){
            if(t < 0.5){
                return this.bounceIn(t * 2) * 0.5;
            }
    
            return this.bounceOut(t * 2 - 1) * 0.5 + 0.5;
        },
    
        execute(type, t){
            return this[type](t);
        },
    },

    initialize(){
        this.initPluginCommands()
    },

    initPluginCommands(){
        const commands = ["cmd_setEasing", "cmd_setQuickEasing"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    getPicEasingType(id){
        return this.quickEasingType || this.picEasingType[id]
    },

    resetEasing(id){
        if(Imported.Eli_ChoicePictures && $gameMessage.isChoice()){

        }else{
            this.quickEasingType = ''
            this.picEasingType[id] = ''
        }
    },

    canEase(id){
        return this.quickEasingType || this.picEasingType[id]
    },

    cmd_setEasing(args){
        const id = Number(Eli.Utils.processEscapeVarOrFormula(args.id))
        this.picEasingType[id] = this.processPictureEasing(args.easing)
    },

    cmd_setQuickEasing(args){
        this.quickEasingType = this.processPictureEasing(args.easing)
    },

    processPictureEasing(prop){
        const easing = {linear: 0, slowStart: 1, slowEnd: 2, slowStartEnd: 3}
        return easing[prop] ?? prop
    },

}

{

const Plugin = Eli.EasingPicture
const Alias = {}

Plugin.initialize()

/* ------------------------------- GAME SCREEN ------------------------------ */
Alias.Game_Screen_showPicture = Game_Screen.prototype.showPicture
Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    Alias.Game_Screen_showPicture.call(this, ...arguments)
    this.picture(pictureId).setId(pictureId)
}

Alias.Game_Screen_erasePicture = Game_Screen.prototype.erasePicture
Game_Screen.prototype.erasePicture = function(pictureId) {
    Alias.Game_Screen_erasePicture.call(this, pictureId)
    Plugin.resetEasing(this._id)
}

/* ------------------------------ GAME PICTURE ------------------------------ */
Alias.Game_Picture_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    Alias.Game_Picture_initialize.call(this)
    this._id = 0
    this.initEasing()
}

Game_Picture.prototype.initEasing = function(){
    this._currentDuration = 0
    this._originX = 0
    this._originY = 0
    this._originScaleX = 0
    this._originScaleY = 0
    this._originOpacity = 0
}

Alias.Game_Picture_move = Game_Picture.prototype.move
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType) {
    this.setOriginProperties()
    arguments[8] = this.getEasingType() === "" ? easingType : this.getEasingType()
    Alias.Game_Picture_move.call(this, ...arguments)
}

Game_Picture.prototype.setOriginProperties = function(){
    this._originX = this._x
    this._originY = this._y
    this._originScaleX = this._scaleX
    this._originScaleY = this._scaleY
    this._originOpacity = this._opacity
    this._currentDuration = 0
}

Alias.Game_Picture_updateMove = Game_Picture.prototype.updateMove;
Game_Picture.prototype.updateMove = function() {
    if(Plugin.canEase(this._id)){
        this.updateEasing()
    }else{
        Alias.Game_Picture_updateMove.call(this)
    }
}

Alias.Game_Picture_erase = Game_Picture.prototype.erase
Game_Picture.prototype.erase = function() {
    Plugin.resetEasing(this._id)
    Alias.Game_Picture_erase.call(this)
}

Game_Picture.prototype.setId = function(id){
    this._id = id
}

Game_Picture.prototype.getEasingType = function(){
    return Plugin.getPicEasingType(this._id) 
}

Game_Picture.prototype.updateEasing = function(){
    if(this._currentDuration < this._duration){

        this._currentDuration++

        let elapsedTime = this._currentDuration / this._duration
        
        elapsedTime = Plugin.easingMethod.execute(this._easingType, elapsedTime)

        this._x = this.processEasingOnProperty(this._originX, elapsedTime, this._targetX)
        this._y = this.processEasingOnProperty(this._originY, elapsedTime, this._targetY)
        this._scaleX = this.processEasingOnProperty(this._originScaleX, elapsedTime, this._targetScaleX)
        this._scaleY = this.processEasingOnProperty(this._originScaleY, elapsedTime, this._targetScaleY)
        this._opacity = this.processEasingOnProperty(this._originOpacity, elapsedTime, this._targetOpacity)

    }else{
        this.stopEasing()
    }
}

Game_Picture.prototype.processEasingOnProperty = function(origin, time, target){
    return origin + time * (target - origin)
}

Game_Picture.prototype.stopEasing = function(){
    this.initEasing()
    this._duration = 0
}

}