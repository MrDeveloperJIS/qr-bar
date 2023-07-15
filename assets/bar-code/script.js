'use strict';

(function () {

	var
		box = document.getElementById('box'),
		txt = document.getElementById('msg'),
		res = document.getElementById('res'),
		set = document.getElementById('set'),
		op1 = document.getElementById('op1'),
		op2 = document.getElementById('op2'),
		in1 = document.getElementById('in1'),
		in2 = document.getElementById('in2'),
		in3 = document.getElementById('in3'),
		in4 = document.getElementById('in4'),
		in5 = document.getElementById('in5'),
		in6 = document.getElementById('in6'),
		in7 = document.getElementById('in7'),
		in8 = document.getElementById('in8'),
		in9 = document.getElementById('in9'),

		current = function (o) {

			o._value = o.value;
		},

		updated = function (o) {

			return o._value == o.value;
		},

		clear = function (o) {

			while (o.childNodes[0]) {

				o.removeChild(o.childNodes[0]);
			}
		},

		hint = function (d) {

			var
				c = 0,
				s = [];

			if (320 == d.dim[0] && 80 == d.dim[1]) delete d.dim;
			if (20 == d.pad[0] && 16 == d.pad[1]) delete d.pad;
			if (0 == d.pal[1]) delete d.pal.pop();
			if (d.pal[0] == '#000000' && !d.pal[1]) delete d.pal;

			for (var k in d) {

				var
					v = d[k];

				if (1 * v == v)
					v = '  <i class="num">' + v + '</i>';

				else if (Array == v.constructor) {
					if (1 * v[0] == v[0])
						v = '[ <i class="num">' + v.join('</i>, <i class="num">') + '</i>]';
					else
						v = '[<i class="clr">"<i>' + v.join('</i>"</i>, <i class="clr">"<i>') + '</i>"</i>]';
				}

				else
					v = ' <i class="txt">"<i>' + v + '</i>"</i>';

				s.push((s.length ? ',' : ' ') + '<b class="key">' + k + '</b> : ' + v);
				c++;
			}

			//if( 1 == c )	else
			res.innerHTML = '<b class="obj"><b>BARCode</b>(</b>' +
				((1 == c) ?
					'<i class="txt">"<i>' + d.msg + '</i>"</i>' :
					'{\n\n    ' + s.join('\n    ') + '\n\n}') +
				'<b class="obj">)</b>;\n';

		},

		download = function (d) {

			function replace(d, r) {

				return d.replace(new RegExp(Object.keys(r).join('|'), 'gi'), function (m) {

					return r[m];
				});
			}

			var
				d = '<!--\n\nhttps://www.mdjahidulislamsujan.com/\n\n-->\n\n' + replace(d, {

					'M ': 'M',
					' M ': 'M',
					' V ': 'V',
					' v ': 'v',
					' H ': 'H',
					' h ': 'h',
					' Z': 'Z',
					' z': 'z',
					' />': '/>'

					,
					'></path>': '/>',
					'svg xmlns="http://www.w3.org/2000/svg"': 'svg'
				}),

				n = 'barcode-' + replace(new Date().toISOString().slice(0, 19), {

					':': '',
					'-': '',
					'T': '-'

				}) + '.svg',

				b = new Blob([d], {
					type: 'image/svg+xml'
				});

			if (window.navigator.msSaveOrOpenBlob) {

				window.navigator.msSaveOrOpenBlob(b, n);

			}
			else {

				var
					a = document.createElement("a"),
					u = URL.createObjectURL(b);

				a.href = u;
				a.download = n;

				document.body.appendChild(a);
				a.click();

				setTimeout(function () {

					document.body.removeChild(a);
					window.URL.revokeObjectURL(u);

				}, 0);
			}

			return false;
		};

	op1.onclick = function () {

		set.className = 'show';
		return false;
	};

	op2.onclick = function () {

		set.className = 'hide';
		return false;
	};

	in1.onchange =
		in2.onchange =
		in3.onchange =
		in4.onchange =
		in5.onchange =
		in6.onchange =
		in7.onchange =
		in9.onchange = function () {

			box.update();
		};

	in2.onchange = function () {

		in1.value = 0;
		box.update();
	};

	in4.onchange = function () {

		in3.value = 0;
		box.update();
	};

	in8.onchange = function () {

		in9.checked = true;
		box.update();
	};

	txt.onkeyup = function () {

		if (updated(txt)) return;

		box.update();
		current(txt);
	};

	box.update = function () {

		clear(box);

		var
			time = new Date(),
			data = {

				msg: txt.value,
				dim: [in1.value | 0, in3.value | 0],
				pad: [in5.value | 0, in6.value | 0],
				pal: [in7.value, in9.checked | 0 && in8.value]
			};

		box.appendChild(BARCode(data))

			.onclick = function () {

				return download(box.innerHTML);
			};

		console.log('Barcode generation time: ' + (new Date() - time) + ' ms');

		hint(data);
	};

	txt.value = [
		'NEXTFOT', '20102022', '21122022'
	][(Math.random() * 3) | 0];

	current(txt);
	box.update();
	txt.focus();
})();