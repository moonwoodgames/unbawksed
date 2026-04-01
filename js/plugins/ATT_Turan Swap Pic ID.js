Game_Screen.prototype.picSwap = function(id1, id2)
{
    id1=this.realPictureId(id1);
    id2=this.realPictureId(id2);

    let tempPic=this._pictures[id1];
    this._pictures[id1]=this._pictures[id2];
    this._pictures[id2]=tempPic;
};

//$gameScreen.picSwap(x, y)