/**
 * WordPress dependencies
 */
import {Component} from '@wordpress/element'

/**
 * External dependencies
 */
import {cloneDeep} from "lodash";
import {SortableContainer, SortableElement} from "react-sortable-hoc";

export default class DragImages extends Component {
	constructor(props) {
		super(props);

		this.onSortEnd = this.onSortEnd.bind(this);
	}

	onSortEnd({oldIndex, newIndex}) {
		const cloneItems = cloneDeep(this.props.items);

		cloneItems.splice(newIndex, 0, cloneItems.splice(oldIndex, 1)[0]);

		this.props.setAttributes({
			[this.props.propName]: cloneItems
		});
	}

	render() {
		const SortableItem = SortableElement(({value}) => {
			return <li><img src={value.image.url} alt={value.title}/></li>;
		});

		const SortableList = SortableContainer(({items}) => {
			return (
				<ul>
					{items.map((value, index) => (
						<SortableItem
							key={`item-${index}`}
							index={index}
							value={value}/>
					))}
				</ul>
			);
		});

		return <SortableList items={this.props.items} onSortEnd={this.onSortEnd}/>;
	}
}
