/*:
 * @target MZ
 * @plugindesc This plugin allows \n to be used in code strings to make new-lines in text component.
 * Requires the HUD Maker Ultra editor.
 * @author SomeRanDev
 * @url http://someran.dev/links
 * @base SRD_HUDMakerUltra
 * @orderAfter SRD_HUDMakerUltra
 *
 * @help
 * ============================================================================
 *                           HUD Maker Ultra Multiline
 *                                 Version 1.0.4
 *                                   SomeRanDev
 * ============================================================================
 *
 * This plugin allows \n to be used in code strings to make new-lines in text
 * component. It doesn't allow line breaks anywhere else!
 *
 * This plugin requires the HUD Maker Ultra software.
 * You can download it for free here:
 * https://someran.dev/rpgmaker/plugins/mv/SRD_HUDMaker.js/
 *
 *
 * ============================================================================
 *  End of Help File
 * ============================================================================
 *
 * Welcome to the bottom of the Help file. Thanks for reading!
 *
 * https://www.youtube.com/SumRndmDde
 * https://bsky.app/profile/someran.dev
 * http://someran.dev
 *
 * Until next time,
 *   ~ SomeRanDev
 */

var SRD = SRD || {};
SRD.HUDMakerUltraMultiline = SRD.HUDMakerUltraMultiline || {};

var Imported = Imported || {};
Imported.SRD_HUDMakerUltraMultiline = 0x010004; // 1.0.4

(function(_) {

"use strict";

_.Sprite_UltraHUDComponent_Text_renderBitmap = Sprite_UltraHUDComponent_Text.prototype.renderBitmap;
Sprite_UltraHUDComponent_Text.prototype.renderBitmap = function(newText) {
	if(!newText || typeof newText !== "string") {
		return _.Sprite_UltraHUDComponent_Text_renderBitmap.apply(this, arguments);
	}

	const linesInText = newText.split("\\n").map(s => s.split("\n")).flat();
	if(linesInText.length === 1) {
		return _.Sprite_UltraHUDComponent_Text_renderBitmap.apply(this, arguments);
	}

	const textData = this._data.TextData;
	const fontSize = this._hud.getConfig().processDynamicInput(textData.FontSize || 0, true);
	const outlineSize = this._hud.getConfig().processDynamicInput(textData.OutlineSize || 0, true);
	const width = textData.MaxWidth + (this._margin * 2);

	const lineHeight = fontSize + (outlineSize * 2);
	const height = (lineHeight * linesInText.length) + (this._margin * 2);
	if(!this.bitmap) {
		this.bitmap = new Bitmap(width, height);
	} else if(this.bitmap.width !== width || this.bitmap.height !== height) {
		this.resizeBitmap(width, height);
	}

	const m = this._margin;
	const m2 = m * 2;
	const align = UltraUtils.convertNumberAlignToText(this._dataAlign);
	this.bitmap.clear();
	for(let i = 0; i < linesInText.length; i++) {
		this.bitmap.drawText(linesInText[i], m, m + (i * lineHeight), this.bitmap.width - m2, lineHeight, align);
	}
};

})(SRD.HUDMakerUltraMultiline);
